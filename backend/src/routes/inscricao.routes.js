const express = require('express');
const router = express.Router();

const {
  listarInscricoes,
  cadastrarInscricao,
  listarInscricoesPorCliente
} = require('../controllers/inscricaoController');

router.get('/inscricoes', listarInscricoes);
router.post('/inscricoes', cadastrarInscricao);

router.get('/usuarios/:id/inscricoes', listarInscricoesPorCliente);

module.exports = router;
