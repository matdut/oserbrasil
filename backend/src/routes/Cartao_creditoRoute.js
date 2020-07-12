const express = require('express');
const router = express.Router();

const Cartao_creditoController  = require('../controllers/Cartao_creditoController');

router.get('/list',Cartao_creditoController.list);
router.post('/create',Cartao_creditoController.create);
router.get('/get/:id', Cartao_creditoController.get);
router.put('/update/:id',Cartao_creditoController.update);
router.get('/getListaporCliente/:id', Cartao_creditoController.getListaporCliente);

module.exports = router;
