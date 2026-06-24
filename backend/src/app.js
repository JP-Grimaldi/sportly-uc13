const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Sportly funcionando');
});

const produtoRoutes = require('./routes/produto.routes');
app.use(produtoRoutes);

const usuariosRoutes = require('./routes/usuarios.routes');
app.use(usuariosRoutes);

const authRoutes = require('./routes/auth.routes');
app.use(authRoutes);

const cursoRoutes = require('./routes/curso.routes');
app.use(cursoRoutes);

const inscricaoRoutes = require('./routes/inscricao.routes');
app.use(inscricaoRoutes);

module.exports = app;
