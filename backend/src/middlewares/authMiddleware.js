const jwt = require('jsonwebtoken');

// Middleware que protege uma rota: so deixa passar quem mandar um token
// JWT valido no cabecalho Authorization (formato "Bearer TOKEN").
function autenticarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token nao informado' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensagem: 'Token nao informado' });
  }

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = usuario;
    next();
  } catch (erro) {
    return res.status(403).json({ mensagem: 'Token invalido ou expirado' });
  }
}

module.exports = autenticarToken;
