const express = require('express');
const router = express.Router();

const {
  listarProdutos,
  buscarProdutoPorId,
  cadastrarProduto,
  atualizarProduto,
  removerProduto
} = require('../controllers/produtoController');

router.get('/produto', listarProdutos);
router.get('/produto/:id', buscarProdutoPorId);
router.post('/produto', cadastrarProduto);
router.put('/produto/:id', atualizarProduto);
router.delete('/produto/:id', removerProduto);

module.exports = router;
