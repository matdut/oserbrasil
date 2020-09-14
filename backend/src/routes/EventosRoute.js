const express = require('express');
const router = express.Router();

const EventosController = require('../controllers/EventosController');

router.get('/list',EventosController.list);
router.get('/listaeventocliente/:id/:perfilId',EventosController.listaevento);
router.post('/create',EventosController.create);
router.get('/get/:id', EventosController.get);
router.get('/getcliente/:id', EventosController.getcliente);
router.put('/update/:id',EventosController.update);
router.delete('/delete/:id',EventosController.delete);
router.delete('/deleteEmpresa/:id',EventosController.deleteEmpresa);

module.exports = router;
