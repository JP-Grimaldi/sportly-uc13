-- Senha dos usuarios de teste: 123456
-- (armazenada como hash bcrypt, do mesmo jeito que a API gera no cadastro)

DROP DATABASE IF EXISTS sportlyDB;
CREATE DATABASE sportlyDB;
USE sportlyDB;

CREATE TABLE cliente (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(60) NOT NULL,
    senha VARCHAR(300) NOT NULL
);

CREATE TABLE categoria_produto (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(100) NOT NULL
);

CREATE TABLE curso (
    id_curso INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    descricao VARCHAR(200) NOT NULL,
    carga_horaria SMALLINT NOT NULL,
    link_video VARCHAR(100) NOT NULL
);

CREATE TABLE endereco (
    id_endereco INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    rua VARCHAR(100) NOT NULL,
    numero INT NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado CHAR(2) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente) ON DELETE CASCADE
);

CREATE TABLE esporte (
    id_esporte INT PRIMARY KEY AUTO_INCREMENT,
    id_curso INT NOT NULL,
    nome VARCHAR(45) NOT NULL,
    modalidade VARCHAR(30) NOT NULL,
    nivel ENUM('Basico', 'Intermediario', 'Avancado') NOT NULL,
    FOREIGN KEY (id_curso) REFERENCES curso(id_curso)
);

CREATE TABLE instrutor (
    id_instrutor INT PRIMARY KEY AUTO_INCREMENT,
    id_curso INT NOT NULL,
    nome VARCHAR(45) NOT NULL,
    especialidade VARCHAR(45) NOT NULL,
    email VARCHAR(60) NOT NULL,
    FOREIGN KEY (id_curso) REFERENCES curso(id_curso)
);

CREATE TABLE inscricao_curso (
    id_inscricao INT PRIMARY KEY AUTO_INCREMENT,
    id_curso INT NOT NULL,
    id_cliente INT NOT NULL,
    data_inscricao DATE NOT NULL,
    situacao ENUM('Ativa', 'Concluida', 'Cancelada') NOT NULL,
    FOREIGN KEY (id_curso) REFERENCES curso(id_curso),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente) ON DELETE CASCADE
);

CREATE TABLE produto (
    id_produto INT PRIMARY KEY AUTO_INCREMENT,
    id_categoria INT NOT NULL,
    nome VARCHAR(45) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT NOT NULL,
    descricao VARCHAR(45),
    imagem VARCHAR(255),
    parcela_qtd INT,
    parcela_valor DECIMAL(10,2),
    FOREIGN KEY (id_categoria) REFERENCES categoria_produto(id_categoria)
);

CREATE TABLE pedido (
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    data_pedido DATE NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente) ON DELETE CASCADE
);

CREATE TABLE pagamento (
    id_pagamento INT PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT NOT NULL,
    data_pagamento DATE NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    forma_pagamento VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido) ON DELETE CASCADE
);

CREATE TABLE pedido_produto (
    id_pedido INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_pedido, id_produto),
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
);


-- Clientes (senha de todos: 123456)
INSERT INTO cliente (nome, email, senha) VALUES
('Grimaldi', 'grimas@sportly.com', '$2b$10$aHOZMZC.1BHdC2/UeJguyuqsy6UWmvnu5Vjm0hSRjxScuB5iIloEq'),
('Thales',   'thales@sportly.com',      '$2b$10$aHOZMZC.1BHdC2/UeJguyuqsy6UWmvnu5Vjm0hSRjxScuB5iIloEq'),
('Cristofer',    'cris@sportly.com',    '$2b$10$aHOZMZC.1BHdC2/UeJguyuqsy6UWmvnu5Vjm0hSRjxScuB5iIloEq');


INSERT INTO categoria_produto (nome, descricao) VALUES
('Bolas',        'Bolas oficiais para diversos esportes'),
('Equipamentos', 'Equipamentos para treino e performance'),
('Acessorios',   'Acessorios e itens de apoio ao treino');

INSERT INTO produto (id_categoria, nome, preco, estoque, descricao, imagem, parcela_qtd, parcela_valor) VALUES
(1, 'Bola de Basquete',       129.90, 50, 'Bola oficial de basquete tamanho 7',  '/imagens/bola-basquete_slider_produtos.png',        6,  21.65),
(1, 'Bola de Futebol Adidas', 199.90, 40, 'Bola de futebol Adidas campo',        '/imagens/bola-futebol-adidas_slider_produtos.png', 10,  19.99),
(1, 'Bola de Futebol',         89.90, 60, 'Bola de futebol society',             '/imagens/bola-futebol_slider_produtos.png',         6,  14.98),
(3, 'Colchonete de Yoga',      79.90, 35, 'Colchonete antiderrapante para yoga', '/imagens/colchonete-yoga_slider_produtos.png',      4,  19.98),
(3, 'Corda de Pular',          39.90, 80, 'Corda de pular com rolamento',        '/imagens/corda-pular_slider_produtos.png',          3,  13.30),
(2, 'Par de Halteres 10kg',   249.90, 25, 'Par de halteres revestidos 10kg',     '/imagens/halteres-10kg_slider_produtos.png',       10,  24.99),
(2, 'Kit de Halteres',        159.90, 30, 'Kit de halteres ajustaveis',          '/imagens/halteres_slider_produtos.png',             6,  26.65),
(2, 'Luva de Boxe Everlast',  219.90, 20, 'Luva de boxe Everlast 12oz',          '/imagens/luva-boxe-everlast_slider_produtos.png',  10,  21.99),
(2, 'Luva de Boxe',           149.90, 28, 'Luva de boxe treino 14oz',            '/imagens/luva-boxe_slider_produtos.png',            6,  24.98),
(2, 'Raquete de Tenis',       299.90, 15, 'Raquete de tenis profissional',       '/imagens/raquete-tenis_slider_produtos.png',       12,  24.99);

INSERT INTO curso (titulo, descricao, carga_horaria, link_video) VALUES
('Fundamentos do Basquete',  'Aprenda os fundamentos do basquete: passe, drible e arremesso', 20, 'https://youtube.com/sportly/basquete'),
('Tenis para Iniciantes',    'Tecnicas basicas de tenis e evolucao do saque',                 16, 'https://youtube.com/sportly/tenis'),
('Volei: Defesa e Recepcao', 'Treino de defesa, recepcao e fundamentos do volei',             18, 'https://youtube.com/sportly/volei'),
('Futsal: Movimentacao',     'Movimentacao, marcacao e jogadas de futsal',                    22, 'https://youtube.com/sportly/futsal'),
('Boxe do Zero',             'Guarda, deslocamento e golpes basicos do boxe',                 24, 'https://youtube.com/sportly/boxe'),
('Condicionamento Fisico',   'Treino funcional para resistencia e forca',                     14, 'https://youtube.com/sportly/condicionamento');

INSERT INTO endereco (id_cliente, rua, numero, bairro, cidade, estado) VALUES
(1, 'Rua das Palmeiras', 123, 'Centro', 'Sao Paulo',      'SP'),
(2, 'Avenida Brasil',    456, 'Jardim', 'Rio de Janeiro', 'RJ');

INSERT INTO esporte (id_curso, nome, modalidade, nivel) VALUES
(1, 'Basquete', 'Quadra',     'Basico'),
(2, 'Tenis',    'Individual', 'Basico'),
(4, 'Futsal',   'Quadra',     'Avancado'),
(5, 'Boxe',     'Combate',    'Intermediario');

INSERT INTO instrutor (id_curso, nome, especialidade, email) VALUES
(1, 'Diego Rocha',     'Basquete de alto rendimento', 'diego.inst@sportly.com'),
(2, 'Carla Santos',    'Tenis profissional',          'carla.inst@sportly.com'),
(5, 'Mestre Okamoto',  'Artes marciais e boxe',       'okamoto.inst@sportly.com');

INSERT INTO inscricao_curso (id_curso, id_cliente, data_inscricao, situacao) VALUES
(1, 1, '2026-03-10', 'Ativa'),
(2, 1, '2026-04-02', 'Concluida'),
(5, 2, '2026-05-15', 'Ativa'),
(4, 3, '2026-06-01', 'Ativa');


INSERT INTO pedido (id_cliente, data_pedido, valor_total) VALUES
(1, '2026-06-10', 379.80),
(2, '2026-06-12', 249.90);


INSERT INTO pedido_produto (id_pedido, id_produto, quantidade, preco_unitario) VALUES
(1, 1, 1, 129.90),
(1, 6, 1, 249.90),
(2, 6, 1, 249.90);


INSERT INTO pagamento (id_pedido, data_pagamento, valor, forma_pagamento) VALUES
(1, '2026-06-10', 379.80, 'Cartao'),
(2, '2026-06-12', 249.90, 'Pix');

-- Consultas de teste (pensando nas rotas da API)
-- Rode estas no Workbench para conferir os dados e os relacionamentos.

-- Produtos com o nome da categoria (vira o GET /produto com JOIN)
-- SELECT p.id_produto, p.nome, p.preco, p.imagem, c.nome AS categoria
-- FROM produto p
-- JOIN categoria_produto c ON c.id_categoria = p.id_categoria;

-- Produtos de uma categoria especifica (vira o GET /categoria/:id/produtos)
-- SELECT * FROM produto WHERE id_categoria = 2;

-- Inscricoes com o nome do cliente e o titulo do curso (vira o GET /inscricoes com JOIN)
-- SELECT i.id_inscricao, cl.nome AS cliente, cu.titulo AS curso, i.situacao
-- FROM inscricao_curso i
-- JOIN cliente cl ON cl.id_cliente = i.id_cliente
-- JOIN curso   cu ON cu.id_curso   = i.id_curso;

-- Inscricoes de um cliente especifico (vira o GET /usuarios/:id/inscricoes)
-- SELECT cu.titulo, i.situacao, i.data_inscricao
-- FROM inscricao_curso i
-- JOIN curso cu ON cu.id_curso = i.id_curso
-- WHERE i.id_cliente = 1;
