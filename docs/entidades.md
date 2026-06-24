# Entidades do Sistema

## Entidades identificadas

| Entidade | Por que ela existe? | Tela relacionada |
|---|---|---|
| cliente | O sistema tem cadastro e login de clientes | `Register`, `Login` |
| categoria_produto | Cada produto da loja pertence a uma categoria | `Loja` (filtro por categoria) |
| produto | É o que é vendido na loja | `Loja`, `ProductDetail` |
| curso | É o conteúdo principal oferecido na plataforma | `Cursos` |
| esporte | Cada curso pode ter um ou mais esportes/modalidades associados | `Cursos` (planejado) |
| instrutor | Cada curso tem um responsável por lecionar | `Cursos` (planejado) |
| inscricao_curso | Liga um cliente a um curso em que ele se inscreveu | `Perfil` (planejado) |
| endereco | Um cliente pode ter um ou mais endereços cadastrados | `Perfil` (planejado) |
| pedido | Registra uma compra feita por um cliente na loja | `Perfil` / carrinho (planejado) |
| pagamento | Registra o pagamento de um pedido | `Perfil` / carrinho (planejado) |
| pedido_produto | Liga um pedido aos produtos comprados nele | `Perfil` / carrinho (planejado) |

## Campos de cada entidade

### Entidade: cliente

| Campo | Tipo sugerido | Obrigatório? | Observação |
|---|---|---|---|
| id_cliente | INT | sim | PK, AUTO_INCREMENT |
| nome | VARCHAR(45) | sim | Nome do cliente |
| email | VARCHAR(60) | sim | Usado no login |
| senha | VARCHAR(300) | sim | Salva com hash (bcrypt) |

### Entidade: categoria_produto

| Campo | Tipo sugerido | Obrigatório? | Observação |
|---|---|---|---|
| id_categoria | INT | sim | PK, AUTO_INCREMENT |
| nome | VARCHAR(100) | sim | Nome da categoria |
| descricao | VARCHAR(100) | sim | Descrição da categoria |

### Entidade: produto

| Campo | Tipo sugerido | Obrigatório? | Observação |
|---|---|---|---|
| id_produto | INT | sim | PK, AUTO_INCREMENT |
| id_categoria | INT | sim | FK para categoria_produto |
| nome | VARCHAR(45) | sim | Nome do produto |
| preco | DECIMAL(10,2) | sim | Preço do produto |
| estoque | INT | sim | Quantidade em estoque |
| descricao | VARCHAR(45) | não | Descrição curta |
| imagem | VARCHAR(255) | não | Caminho da imagem, servida pela própria API |
| parcela_qtd | INT | não | Quantidade de parcelas |
| parcela_valor | DECIMAL(10,2) | não | Valor de cada parcela |

### Entidade: curso

| Campo | Tipo sugerido | Obrigatório? | Observação |
|---|---|---|---|
| id_curso | INT | sim | PK, AUTO_INCREMENT |
| titulo | VARCHAR(150) | sim | Título do curso |
| descricao | VARCHAR(200) | sim | Descrição do curso |
| carga_horaria | SMALLINT | sim | Carga horária em horas |
| link_video | VARCHAR(100) | sim | Link do vídeo do curso |

### Entidade: esporte

| Campo | Tipo sugerido | Obrigatório? | Observação |
|---|---|---|---|
| id_esporte | INT | sim | PK, AUTO_INCREMENT |
| id_curso | INT | sim | FK para curso |
| nome | VARCHAR(45) | sim | Nome do esporte |
| modalidade | VARCHAR(30) | sim | Modalidade do esporte |
| nivel | ENUM('Basico','Intermediario','Avancado') | sim | Nível do esporte |

### Entidade: instrutor

| Campo | Tipo sugerido | Obrigatório? | Observação |
|---|---|---|---|
| id_instrutor | INT | sim | PK, AUTO_INCREMENT |
| id_curso | INT | sim | FK para curso |
| nome | VARCHAR(45) | sim | Nome do instrutor |
| especialidade | VARCHAR(45) | sim | Especialidade do instrutor |
| email | VARCHAR(60) | sim | Email de contato |

### Entidade: inscricao_curso

| Campo | Tipo sugerido | Obrigatório? | Observação |
|---|---|---|---|
| id_inscricao | INT | sim | PK, AUTO_INCREMENT |
| id_curso | INT | sim | FK para curso |
| id_cliente | INT | sim | FK para cliente |
| data_inscricao | DATE | sim | Data em que o cliente se inscreveu |
| situacao | ENUM('Ativa','Concluida','Cancelada') | sim | Situação da inscrição |

### Entidade: endereco

| Campo | Tipo sugerido | Obrigatório? | Observação |
|---|---|---|---|
| id_endereco | INT | sim | PK, AUTO_INCREMENT |
| id_cliente | INT | sim | FK para cliente |
| rua | VARCHAR(100) | sim | Nome da rua |
| numero | INT | sim | Número do endereço |
| bairro | VARCHAR(50) | sim | Bairro |
| cidade | VARCHAR(50) | sim | Cidade |
| estado | CHAR(2) | sim | Sigla do estado (UF) |

### Entidade: pedido

| Campo | Tipo sugerido | Obrigatório? | Observação |
|---|---|---|---|
| id_pedido | INT | sim | PK, AUTO_INCREMENT |
| id_cliente | INT | sim | FK para cliente |
| data_pedido | DATE | sim | Data do pedido |
| valor_total | DECIMAL(10,2) | sim | Valor total do pedido |

### Entidade: pagamento

| Campo | Tipo sugerido | Obrigatório? | Observação |
|---|---|---|---|
| id_pagamento | INT | sim | PK, AUTO_INCREMENT |
| id_pedido | INT | sim | FK para pedido |
| data_pagamento | DATE | sim | Data do pagamento |
| valor | DECIMAL(10,2) | sim | Valor pago |
| forma_pagamento | VARCHAR(20) | sim | Forma de pagamento usada |

### Entidade: pedido_produto

| Campo | Tipo sugerido | Obrigatório? | Observação |
|---|---|---|---|
| id_pedido | INT | sim | PK composta, FK para pedido |
| id_produto | INT | sim | PK composta, FK para produto |
| quantidade | INT | sim | Quantidade do produto no pedido |
| preco_unitario | DECIMAL(10,2) | sim | Preço do produto no momento da compra |

## Relacionamentos

| Relacionamento | Tipo | Explicação |
|---|---|---|
| cliente → endereco | 1:N | Um cliente pode ter vários endereços |
| cliente → pedido | 1:N | Um cliente pode fazer vários pedidos |
| cliente ↔ curso | N:N | Um cliente pode se inscrever em vários cursos e um curso pode ter vários clientes, através de inscricao_curso |
| curso → esporte | 1:N | Um curso pode ter vários esportes associados |
| curso → instrutor | 1:N | Um curso pode ter vários instrutores |
| categoria_produto → produto | 1:N | Uma categoria pode ter vários produtos |
| pedido → pagamento | 1:N | Um pedido pode ter vários pagamentos |
| pedido ↔ produto | N:N | Um pedido pode ter vários produtos e um produto pode estar em vários pedidos, através de pedido_produto |