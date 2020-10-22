const express = require('express');
const router = express.Router();

const Cartao_creditoController  = require('../controllers/Cartao_creditoController');

router.get('/list',Cartao_creditoController.list);
router.get('/list_cartao_cliente/:logid/:perfilId',Cartao_creditoController.list_cartao_cliente);
router.post('/create',Cartao_creditoController.create);
router.get('/get/:id', Cartao_creditoController.get);
router.put('/update/:id',Cartao_creditoController.update);
router.delete('/delete/:id',Cartao_creditoController.delete);
router.get('/getListaporCliente/:id', Cartao_creditoController.getListaporCliente);

module.exports = router;
