const express = require('express');
const router = express.Router();

const BuscaReceitaController = require('../controllers/BuscaReceitaController');

router.get('/busca',BuscaReceitaController.list);

module.exports = router;
