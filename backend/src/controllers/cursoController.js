const conexao = require('../database/conexao');

// Listatodos os cursos cadastrados no banco
async function listarCursos(req, res) {
  try {
    const cursos = await conexao.query('SELECT * FROM curso');
    res.json(cursos[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro ao buscar cursos' });
  }
}

module.exports = {
  listarCursos
};
