const express = require('express');
const router = express.Router();

const HistoricoServicosController = require('../controllers/HistoricoServicosController');

router.get('/listporevento/:id',HistoricoServicosController.listporevento);
router.get('/listaservicosexcluidos/:eventoid/:id/:perfilId',HistoricoServicosController.listaservicos);
router.post('/create',HistoricoServicosController.create);
router.put('/update/:id',HistoricoServicosController.update);
router.get('/get/:id', HistoricoServicosController.get);
router.delete('/delete/:id',HistoricoServicosController.delete);

module.exports = router;
