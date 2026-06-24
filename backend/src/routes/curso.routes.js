const express = require('express');
const router = express.Router();

const { listarCursos } = require('../controllers/cursoController');

router.get('/curso', listarCursos);

module.exports = router;
