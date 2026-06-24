# Rotas Planejadas da API

A base da API é `http://localhost:3000`

| Método | Rota | Objetivo | Tela que usa | Body necessário |
|---|---|---|---|---|
| POST | /login | Autenticar o cliente e devolver um token | Login | email, senha |
| GET | /perfil | Buscar os dados do cliente logado (rota protegida por token) | Perfil (planejado) | — (token no header) |
| GET | /usuarios | Listar os clientes cadastrados | Cadastro | — |
| POST | /usuarios | Cadastrar um novo cliente (senha vira hash com bcrypt) | Cadastro | nome, email, senha |
| GET | /usuarios/:id/inscricoes | Listar as inscrições de um cliente específico | Perfil (planejado) | — |
| GET | /produto | Listar todos os produtos | Loja | — |
| GET | /produto/:id | Buscar um produto específico pelo id | Detalhe do produto | — |
| POST | /produto | Cadastrar um novo produto | uso administrativo | id_categoria, nome, preco, estoque, descricao, imagem, parcela_qtd, parcela_valor |
| PUT | /produto/:id | Atualizar um produto existente | uso administrativo | mesmos campos do produto |
| DELETE | /produto/:id | Remover um produto | uso administrativo | — |
| GET | /curso | Listar todos os cursos | Cursos | — |
| GET | /inscricoes | Listar todas as inscrições, com o nome do cliente e o título do curso | uso administrativo | — |
| POST | /inscricoes | Inscrever um cliente em um curso (valida se o cliente e o curso existem) | Cursos / Perfil (planejado) | id_cliente, id_curso, data_inscricao, situacao |
| GET | /enderecos | Listar endereços cadastrados | planejado | — |
| GET | /usuarios/:id/enderecos | Listar os endereços de um cliente específico | Perfil (planejado) | — |
| POST | /enderecos | Cadastrar um endereço para um cliente | Perfil (planejado) | id_cliente, rua, numero, bairro, cidade, estado |
| GET | /instrutores | Listar instrutores | planejado | — |
| GET | /curso/:id/instrutores | Listar os instrutores de um curso | Cursos (planejado) | — |
| GET | /esportes | Listar esportes | planejado | — |
| GET | /curso/:id/esportes | Listar os esportes de um curso | Cursos (planejado) | — |
| GET | /pedidos | Listar pedidos | planejado | — |
| GET | /usuarios/:id/pedidos | Listar os pedidos de um cliente | Perfil (planejado) | — |
| POST | /pedidos | Cadastrar um pedido | Loja / carrinho (planejado) | id_cliente, data_pedido, valor_total |
| GET | /pagamentos | Listar pagamentos | planejado | — |
| POST | /pagamentos | Cadastrar um pagamento | Loja / carrinho (planejado) | id_pedido, data_pagamento, valor, forma_pagamento |