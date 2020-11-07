const express = require('express');
const router = express.Router();

const EventosController = require('../controllers/EventosController');

router.get('/list',EventosController.list);
router.get('/listaeventocliente/:id/:perfilId',EventosController.listaevento);
router.post('/create',EventosController.create);
router.get('/get/:id', EventosController.get);
router.get('/getcliente/:id', EventosController.getcliente);
router.put('/update/:id',EventosController.update);
router.put('/updateEvento/:id/:perfilId',EventosController.updateevento);
router.delete('/delete/:id',EventosController.delete);
router.delete('/deleteEmpresa/:id',EventosController.deleteEmpresa);
router.get('/totaleventos/:id/:perfilId',EventosController.totaleventos);
router.get('/buscaservicos/:eventoid/:id/:perfilId',EventosController.listServicosBusca);
router.get('/totaleventosADM',EventosController.totaleventosADM);

module.exports = router;
