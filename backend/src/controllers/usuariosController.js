const bcrypt = require('bcryptjs');
const conexao = require('../database/conexao');

// Lista os clientes cadastrados (sem devolver a senha).
async function listarUsuarios(req, res) {
  try {
    const usuarios = await conexao.query(
      'SELECT id_cliente, nome, email FROM cliente'
    );
    res.json(usuarios[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro ao buscar usuarios' });
  }
}

// Cadastra um novo cliente. A senha nunca e salva em texto puro: ela passa
// pelo bcrypt antes de ir para o banco.
async function cadastrarUsuario(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ mensagem: 'Nome, email e senha sao obrigatorios' });
    }

    // Impede cadastrar dois clientes com o mesmo email
    const existente = await conexao.query(
      'SELECT id_cliente FROM cliente WHERE email = ?',
      [email]
    );
    if (existente[0].length > 0) {
      return res.status(400).json({ mensagem: 'Este email ja esta cadastrado' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const resultado = await conexao.query(
      'INSERT INTO cliente (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, senhaCriptografada]
    );

    res.status(201).json({
      mensagem: 'Usuario cadastrado com sucesso',
      id_cliente: resultado[0].insertId
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro ao cadastrar usuario' });
  }
}

module.exports = {
  listarUsuarios,
  cadastrarUsuario
};
