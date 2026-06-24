const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const conexao = require('../database/conexao');

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha sao obrigatorios' });
    }

    const usuarios = await conexao.query(
      'SELECT * FROM cliente WHERE email = ?',
      [email]
    );

    
    if (usuarios[0].length === 0) {
      return res.status(400).json({ error: 'Email ou senha invalidos' });
    }

    const usuario = usuarios[0][0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(400).json({ error: 'Email ou senha invalidos' });
    }

    const token = jwt.sign(
      { id: usuario.id_cliente, nome: usuario.nome, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      mensagem: 'Login realizado com sucesso',
      token,
      usuario: { id: usuario.id_cliente, nome: usuario.nome, email: usuario.email }
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
}

async function perfil(req, res) {
  try {
    const usuarios = await conexao.query(
      'SELECT id_cliente, nome, email FROM cliente WHERE id_cliente = ?',
      [req.usuario.id]
    );

    if (usuarios[0].length === 0) {
      return res.status(404).json({ mensagem: 'Usuario nao encontrado' });
    }

    res.json(usuarios[0][0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro ao buscar perfil' });
  }
}

module.exports = {
  login,
  perfil
};
