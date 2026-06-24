const express = require('express');
const router = express.Router();

const { login, perfil } = require('../controllers/authController');
const autenticarToken = require('../middlewares/authMiddleware');

router.post('/login', login);

router.get('/perfil', autenticarToken, perfil);
//o autenticarToken é um middleware

module.exports = router;
