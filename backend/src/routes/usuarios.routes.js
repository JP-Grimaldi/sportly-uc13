const express = require('express');
const router = express.Router();

const { listarUsuarios, cadastrarUsuario } = require('../controllers/usuariosController');

router.get('/usuarios', listarUsuarios);
router.post('/usuarios', cadastrarUsuario);

module.exports = router;
