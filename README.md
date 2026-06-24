# Sportly

## Descrição do Projeto

A Sportly é uma plataforma web que une duas frentes: uma loja de produtos esportivos (bolas, equipamentos, acessórios) e uma área de cursos/treinos esportivos. Os usuários podem se cadastrar, fazer login, navegar pelo catálogo de produtos, ver os detalhes de cada um e conferir os cursos disponíveis.

O projeto foi desenvolvido como trabalho final da UC13 — Programar aplicativos computacionais com integração de banco de dados para web, com o objetivo de construir a API que integra com o front-end em React feito na UC anterior, usando front-end, back-end e banco de dados integrados.

---

## Integrantes do Grupo

- Cristofer Lacerda
- João Pedro Grimaldi
- Thales Lopes

---

## Tecnologias Utilizadas

### Front-end

- React
- React Router DOM
- Axios
- Vite
- Tailwind CSS
- Bootstrap / Bootstrap Icons

### Back-end

- Node.js
- Express

### Banco de Dados

- MySQL
- MySQL Workbench

### Bibliotecas e Ferramentas

- mysql2
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- nodemon

---

## Funcionalidades Implementadas

- Cadastro de clientes
- Login de clientes, com senha protegida por hash (bcrypt)
- Autenticação com JWT, incluindo uma rota protegida (`GET /perfil`)
- CRUD completo de produtos (listar, buscar por id, criar, atualizar, remover)
- Listagem de cursos
- Inscrição de clientes em cursos, com validação de chave estrangeira
- Consultas com JOIN (produtos com categoria, inscrições com cliente e curso)
- Consulta filtrada por relacionamento (inscrições de um cliente específico)
- CORS habilitado para o front-end consumir a API de outra origem

---

## Como Executar o Projeto

Siga os passos abaixo para executar o projeto localmente.

1. Clonar o Repositório:

```
git clone https://github.com/JP-Grimaldi/sportly-uc13.git
```

2. Entrar na pasta do projeto:

```
cd projeto-final
```

3. Configurar as Variáveis de Ambiente

Dentro da pasta `backend/`, copie o `.env.example` para `.env` e preencha com os seus dados:

```
cp backend/.env.example backend/.env
```

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=sportlyDB
DB_PORT=3306
JWT_SECRET=qualquer_texto_secreto_aqui
JWT_EXPIRES_IN=1h
```

4. Criar o Banco de Dados

Rode o script `database/database.sql` (no MySQL Workbench ou pelo terminal):

```
mysql -u root < database/database.sql
```

Isso cria o banco `sportlyDB` com as tabelas e os dados de teste.

5. Rodar o Servidor Back-end

```
cd backend
npm install
npm run dev
```

A API sobe em `http://localhost:3000`.

6. Acessar o Front-end

O front-end (React) vive em um repositório separado. Para rodar:

```
cd FrontEnd_Sportly
npm install
npm run dev
```

O site abre em `http://localhost:5173` e já consome a API rodando na porta 3000.