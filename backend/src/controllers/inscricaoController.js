const conexao = require('../database/conexao');

async function listarInscricoes(req, res) {
  try {
    const inscricoes = await conexao.query(`
      SELECT
        ic.id_inscricao,
        cl.nome AS cliente,
        cu.titulo AS curso,
        ic.data_inscricao,
        ic.situacao
      FROM inscricao_curso ic
      JOIN cliente cl ON cl.id_cliente = ic.id_cliente
      JOIN curso cu ON cu.id_curso = ic.id_curso
    `);

    res.json(inscricoes[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro ao buscar inscricoes' });
  }
}

async function cadastrarInscricao(req, res) {
  try {
    const { id_cliente, id_curso, data_inscricao, situacao } = req.body;

    if (!id_cliente || !id_curso || !data_inscricao || !situacao) {
      return res.status(400).json({
        mensagem: 'id_cliente, id_curso, data_inscricao e situacao sao obrigatorios'
      });
    }

    const cliente = await conexao.query(
      'SELECT id_cliente FROM cliente WHERE id_cliente = ?',
      [id_cliente]
    );
    if (cliente[0].length === 0) {
      return res.status(404).json({ mensagem: 'Cliente nao encontrado' });
    }

    const curso = await conexao.query(
      'SELECT id_curso FROM curso WHERE id_curso = ?',
      [id_curso]
    );
    if (curso[0].length === 0) {
      return res.status(404).json({ mensagem: 'Curso nao encontrado' });
    }

    const resultado = await conexao.query(
      'INSERT INTO inscricao_curso (id_curso, id_cliente, data_inscricao, situacao) VALUES (?, ?, ?, ?)',
      [id_curso, id_cliente, data_inscricao, situacao]
    );

    res.status(201).json({
      mensagem: 'Inscricao realizada com sucesso',
      id_inscricao: resultado[0].insertId
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro ao cadastrar inscricao' });
  }
}

async function listarInscricoesPorCliente(req, res) {
  try {
    const { id } = req.params;

    const inscricoes = await conexao.query(
      `SELECT
         ic.id_inscricao,
         cu.titulo AS curso,
         ic.data_inscricao,
         ic.situacao
       FROM inscricao_curso ic
       JOIN curso cu ON cu.id_curso = ic.id_curso
       WHERE ic.id_cliente = ?`,
      [id]
    );

    res.json(inscricoes[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro ao buscar inscricoes do cliente' });
  }
}

module.exports = {
  listarInscricoes,
  cadastrarInscricao,
  listarInscricoesPorCliente
};
