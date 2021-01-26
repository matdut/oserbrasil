const express = require('express');
const router = express.Router();

const FinalizadosServicosController = require('../controllers/FinalizadosServicosController');

router.get('/listporevento/:id',FinalizadosServicosController.listporevento);
router.get('/listaservicos/:id/:perfilId',FinalizadosServicosController.listaservicos);
router.get('/listaservicosEmpresarial/:id/:perfilId',FinalizadosServicosController.listaservicosEmpresarial);
router.get('/listaservicosexcluidos/:eventoid/:id/:perfilId',FinalizadosServicosController.listaservicos);
router.post('/create',FinalizadosServicosController.create);
router.put('/update/:id',FinalizadosServicosController.update);
router.get('/get/:id', FinalizadosServicosController.get);
router.delete('/delete/:id',FinalizadosServicosController.delete);

module.exports = router;
