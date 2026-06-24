# Sportly — Back-end

API em **Node.js + Express + mysql2**, organizada em `app.js` (configura a aplicação)
e `server.js` (só inicia o servidor), com rotas e controllers separados por entidade.

## Estrutura

```
backend/
├── server.js                      # inicia o servidor (porta 3000)
├── src/
│   ├── app.js                     # Express, middlewares (cors, json) e rotas
│   ├── database/
│   │   └── conexao.js             # pool de conexao com o MySQL (mysql2/promise)
│   ├── routes/
│   │   └── produto.routes.js      # GET /produto
│   └── controllers/
│       └── produtoController.js   # listarProdutos
├── .env                            # suas credenciais locais (nao vai pro git)
├── .env.example                    # variaveis que o projeto precisa, sem valores
└── package.json
```

## Como rodar

1. Tenha o MySQL rodando localmente e crie o banco

2. Copie o `.env.example` para `.env` e preencha com os seus dados:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_NAME=sportlyDB
   DB_PORT=3306
   JWT_SECRET=qualquer_texto_secreto_aqui
   JWT_EXPIRES_IN=1h
   ```

3. Instale as dependências com "npm i"

4. Rode em modo desenvolvimento (reinicia automaticamente com o nodemon):

   ```
   npm run dev
   ```

5. A API sobe em `http://localhost:3000`. Teste no navegador ou no Thunder Client:

   ```
   GET http://localhost:3000/
   GET http://localhost:3000/produto
   ```

| Método | Rota                      | Controller                                      | Validação / status                                  |
| ------ | ------------------------- | ------------------------------------------------ | ----------------------------------------------------- |
| GET    | `/`                       | (definida direto em `app.js`)                    | —                                                      |
| GET    | `/produto`                | `produtoController.listarProdutos`               | —                                                      |
| GET    | `/produto/:id`            | `produtoController.buscarProdutoPorId`           | 404 se não encontrar                                  |
| POST   | `/produto`                | `produtoController.cadastrarProduto`             | 400 se faltar campo · 201 ao criar                    |
| PUT    | `/produto/:id`            | `produtoController.atualizarProduto`             | 400 se faltar campo · 404 se não existir              |
| DELETE | `/produto/:id`            | `produtoController.removerProduto`               | 404 se não existir · 409 se estiver em um pedido      |
| GET    | `/usuarios`               | `usuariosController.listarUsuarios`              | nunca devolve a senha                                 |
| POST   | `/usuarios`               | `usuariosController.cadastrarUsuario`            | 400 se faltar campo ou email duplicado · senha em hash |
| POST   | `/login`                  | `authController.login`                           | bcrypt + JWT · mensagem genérica em caso de erro      |
| GET    | `/curso`                  | `cursoController.listarCursos`                   | —                                                      |
| GET    | `/perfil`                 | `authController.perfil`                          | **rota protegida** — exige token JWT válido           |
| GET    | `/inscricoes`             | `inscricaoController.listarInscricoes`           | JOIN com cliente e curso                              |
| POST   | `/inscricoes`             | `inscricaoController.cadastrarInscricao`         | valida se `id_cliente` e `id_curso` existem (FK)      |
| GET    | `/usuarios/:id/inscricoes`| `inscricaoController.listarInscricoesPorCliente` | filtro por relacionamento · JOIN com curso            |

Testado de ponta a ponta com banco MySQL real, incluindo: CRUD completo de
produto, cadastro/login de usuário (com a senha protegida por bcrypt e token
JWT gerado), bloqueio de email duplicado, JOIN nas inscrições, e as duas
validações de FK (cliente/curso inexistentes) retornando 404 corretamente.

## Sobre o login e o token

O login segue o fluxo da Aula 12/14: a senha enviada é comparada com o hash
salvo no banco usando `bcrypt.compare`, e nunca é "descriptografada". Se a
conta existir mas a senha estiver errada — ou se o e-mail nem existir — a API
sempre responde com a mesma mensagem genérica (`"Email ou senha invalidos"`),
para não dar pistas a quem está tentando adivinhar contas.

Se o login der certo, a API gera um token (JWT) com `jsonwebtoken`, assinado
com a chave em `JWT_SECRET` (no `.env`) e válido pelo tempo definido em
`JWT_EXPIRES_IN`. O front-end guarda esse token no `localStorage`.

## Rota protegida

`GET /perfil` é a rota protegida do projeto: devolve os dados do usuário que
está logado, identificado pelo token. Ela passa primeiro pelo middleware
`src/middlewares/authMiddleware.js` (`autenticarToken`), que:

1. lê o cabeçalho `Authorization` da requisição;
2. confere se o token foi enviado no formato `Bearer TOKEN`;
3. valida o token com `jwt.verify`;
4. se for válido, salva os dados em `req.usuario` e libera a rota (`next()`);
5. se não for, bloqueia a requisição.

| Situação | Status |
| --- | --- |
| Nenhum token enviado | `401 Token nao informado` |
| Token inválido, malformado ou expirado | `403 Token invalido ou expirado` |
| Token válido | `200` com os dados do usuário |

No front-end, a tela de **Perfil** já busca esses dados automaticamente: se
houver um token salvo (de um login anterior), ela envia
`Authorization: Bearer TOKEN` para `GET /perfil` e mostra o nome e o e-mail
reais de quem está logado. Sem token, a tela continua funcionando com os
dados de exemplo (não quebra para quem ainda não fez login).

