const express = require('express');
const router = express.Router();

const ServicosController = require('../controllers/ServicosController');

router.get('/listporevento/:id',ServicosController.listporevento);
router.post('/create',ServicosController.create);
router.put('/update/:id',ServicosController.update);
router.get('/get/:id', ServicosController.get);
router.delete('/delete/:id',ServicosController.delete);
router.get('/listaservicosevento/:eventoid/:id/:perfilId',ServicosController.listaservicos);
router.get('/buscar_informacao/:data_servico', ServicosController.getbusca);
router.get('/totalservicos/:eventoid/:id/:perfilId',ServicosController.totalValorServicos);
router.get('/totalviagens/:eventoid/:id/:perfilId',ServicosController.totalViagens);
router.get('/listaeventosservicos/:eventoid/:id/:perfilId',ServicosController.listaeventosservicos);
router.get('/valorServicoTodosEventos/:id/:perfilId',ServicosController.valorServicoTodosEventos);
router.get('/totalViagensEventos/:id/:perfilId',ServicosController.totalViagensEventos);
router.get('/TotalTodosvalorServicoADM',ServicosController.TotalTodosvalorServicoADM);
router.get('/totalviagensAdm',ServicosController.totalViagensADM);



module.exports = router;
