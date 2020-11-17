const express = require('express');
const router = express.Router();

const HistoricoEventosController = require('../controllers/HistoricoEventosController');

router.get('/list',HistoricoEventosController.list);
router.get('/listaeventoexcluidos/:id/:perfilId',HistoricoEventosController.listaeventoexcluidos);
router.post('/create',HistoricoEventosController.create);
router.get('/get/:id', HistoricoEventosController.get);
router.put('/update/:id',HistoricoEventosController.update);
router.delete('/delete/:id',HistoricoEventosController.delete);

module.exports = router;
