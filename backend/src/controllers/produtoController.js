const conexao = require('../database/conexao');

async function listarProdutos(req, res) {
  try {
    const produtos = await conexao.query('SELECT * FROM produto');
    res.json(produtos[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro ao buscar produtos' });
  }
}

async function buscarProdutoPorId(req, res) {
  try {
    const { id } = req.params;

    const produto = await conexao.query(
      'SELECT * FROM produto WHERE id_produto = ?',
      [id]
    );

    if (produto[0].length === 0) {
      return res.status(404).json({ mensagem: 'Produto nao encontrado' });
    }

    res.json(produto[0][0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro ao buscar produto' });
  }
}

async function cadastrarProduto(req, res) {
  try {
    const { id_categoria, nome, preco, estoque, descricao, imagem, parcela_qtd, parcela_valor } = req.body;

    // Validacao basica: os campos obrigatorios do produto precisam ser enviados
    if (!id_categoria || !nome || !preco || !estoque) {
      return res.status(400).json({
        mensagem: 'id_categoria, nome, preco e estoque sao obrigatorios'
      });
    }

    const resultado = await conexao.query(
      `INSERT INTO produto (id_categoria, nome, preco, estoque, descricao, imagem, parcela_qtd, parcela_valor)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id_categoria, nome, preco, estoque, descricao || null, imagem || null, parcela_qtd || null, parcela_valor || null]
    );

    res.status(201).json({
      mensagem: 'Produto cadastrado com sucesso',
      id_produto: resultado[0].insertId
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro ao cadastrar produto' });
  }
}

async function atualizarProduto(req, res) {
  try {
    const { id } = req.params;
    const { id_categoria, nome, preco, estoque, descricao, imagem, parcela_qtd, parcela_valor } = req.body;

    if (!id_categoria || !nome || !preco || !estoque) {
      return res.status(400).json({
        mensagem: 'id_categoria, nome, preco e estoque sao obrigatorios'
      });
    }

    const resultado = await conexao.query(
      `UPDATE produto
       SET id_categoria = ?, nome = ?, preco = ?, estoque = ?, descricao = ?, imagem = ?, parcela_qtd = ?, parcela_valor = ?
       WHERE id_produto = ?`,
      [id_categoria, nome, preco, estoque, descricao || null, imagem || null, parcela_qtd || null, parcela_valor || null, id]
    );

    if (resultado[0].affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Produto nao encontrado' });
    }

    res.json({ mensagem: 'Produto atualizado com sucesso' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro ao atualizar produto' });
  }
}

async function removerProduto(req, res) {
  try {
    const { id } = req.params;

    const resultado = await conexao.query(
      'DELETE FROM produto WHERE id_produto = ?',
      [id]
    );

    if (resultado[0].affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Produto nao encontrado' });
    }

    res.json({ mensagem: 'Produto removido com sucesso' });
  } catch (erro) {
    // Se o produto ja estiver em algum pedido, o MySQL bloqueia a exclusao
    // por causa da FK em pedido_produto. Avisamos isso de forma clara.
    if (erro.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({
        mensagem: 'Este produto nao pode ser removido porque ja esta em pedidos existentes'
      });
    }

    console.error(erro);
    res.status(500).json({ mensagem: 'Erro ao remover produto' });
  }
}

module.exports = {
  listarProdutos,
  buscarProdutoPorId,
  cadastrarProduto,
  atualizarProduto,
  removerProduto
};

