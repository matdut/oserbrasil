const express = require('express');
const router = express.Router();

const EstadoController = require('../controllers/EstadoController');

router.get('/list',EstadoController.list);
router.post('/create',EstadoController.create);
router.get('/get/:estado', EstadoController.get);
router.put('/update/:id',EstadoController.update);
//router.getEstado('/getEstado/:estado', EstadoController.getEstado);

module.exports = router;
