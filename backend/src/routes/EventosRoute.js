const express = require('express');
const router = express.Router();

const EventosController = require('../controllers/EventosController');

router.get('/list',EventosController.list);
router.get('/listaeventocliente/:id',EventosController.listaevento);
router.post('/create',EventosController.create);
router.get('/get/:id', EventosController.get);
router.put('/update/:id',EventosController.update);
router.delete('/delete/:id',EventosController.delete);

module.exports = router;
