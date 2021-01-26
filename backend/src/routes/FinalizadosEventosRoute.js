const express = require('express');
const router = express.Router();

const FinalizadosEventosController = require('../controllers/FinalizadosEventosController');

router.get('/list',FinalizadosEventosController.list);
router.get('/listaeventoexcluidos/:id/:perfilId',FinalizadosEventosController.listaeventoexcluidos);
router.post('/create',FinalizadosEventosController.create);
router.get('/get/:id', FinalizadosEventosController.get);
router.put('/update/:id',FinalizadosEventosController.update);
router.delete('/delete/:id',FinalizadosEventosController.delete);

module.exports = router;
