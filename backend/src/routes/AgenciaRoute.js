const express = require('express');
const router = express.Router();

const AgenciaController = require('../controllers/AgenciaController');

router.get('/list',AgenciaController.list);
router.post('/create',AgenciaController.create);
router.get('/get/:id', AgenciaController.get);
router.get('/getbusca/:descricao', AgenciaController.getbusca);
router.put('/update/:id',AgenciaController.update);

module.exports = router;