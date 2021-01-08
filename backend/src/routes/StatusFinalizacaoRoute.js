const express = require('express');
const router = express.Router();

const StatusFinalizacaoController = require('../controllers/StatusFinalizacaoController');

router.get('/list',StatusFinalizacaoController.list);
router.get('/listafiltro',StatusFinalizacaoController.listafiltro);
router.post('/create',StatusFinalizacaoController.create);
router.get('/get/:id', StatusFinalizacaoController.get);
router.put('/update/:id',StatusFinalizacaoController.update);

module.exports = router;
