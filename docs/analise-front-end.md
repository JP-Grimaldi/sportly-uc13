# Análise do Front-end

## Nome do projeto

Sportly

## Integrantes

- Cristofer Lacerda
- João Pedro Grimaldi
- Thales Lopes

## Telas existentes

| Tela | Arquivo ou rota | O que aparece nela? | O que o usuário pode fazer? |
|---|---|---|---|
| Home | `/` (`Home/index.jsx`) | Banner de destaque, categorias de esporte e chamadas para ação | Ir para Cursos ou criar uma conta |
| Login | `/login` (`Login/index.jsx`) | Formulário de login e opções de login social | Entrar com email e senha, ou ir para o cadastro |
| Cadastro | `/register` (`Register/index.jsx`) | Formulário de cadastro com medidor de força de senha | Criar uma conta nova |
| Loja | `/loja` (`Loja/index.jsx`) | Catálogo de produtos em cards, filtro por categoria, busca e carrinho lateral | Buscar, filtrar, ordenar e adicionar produtos ao carrinho |
| Detalhe do produto | `/productDetail/:id_produto` (`ProductDetail/index.jsx`) | Imagem, nome, preço, parcelamento e descrição de um produto específico | Trocar a imagem em destaque e ajustar a quantidade |
| Cursos | `/cursos` (`Cursos/index.jsx`) | Cards de cursos com título, capa e carga horária, mais campo de busca | Buscar um curso pelo nome |
| Perfil | `/profile` (`Profile/index.jsx`) | Dados do usuário, métricas e progresso (dados de exemplo por enquanto) | Navegar entre as abas de metas, estatísticas e conquistas |

## Formulários existentes

| Tela | Campos do formulário | O que deve acontecer ao enviar? |
|---|---|---|
| Login | email, senha | Validar o usuário e devolver um token (POST /login) |
| Cadastro | nome, email, senha, confirmar senha | Criptografar a senha com bcrypt e cadastrar o cliente (POST /usuarios) |

## Listas, cards ou tabelas existentes

| Tela | Dados exibidos | Esses dados virão do banco? |
|---|---|---|
| Loja | Produtos (nome, preço, descrição, imagem e categoria) | Sim |
| Detalhe do produto | Dados completos de um produto específico | Sim |
| Cursos | Cursos (título, descrição e carga horária) | Sim |
| Cadastro | Lista de clientes já cadastrados (usada para conferência no front) | Sim |
| Perfil | Métricas, metas e progresso do usuário | Ainda não (tela usa dados de exemplo) |

## Botões importantes

| Tela | Botão | Ação esperada |
|---|---|---|
| Login | Entrar | Fazer POST /login |
| Cadastro | Criar minha conta | Fazer POST /usuarios |
| Loja | Adicionar ao carrinho | Adicionar o produto ao carrinho (controlado só no front, por enquanto) |
| Loja | Carrinho | Abrir o carrinho lateral com os itens adicionados |