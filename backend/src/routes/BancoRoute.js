const express = require('express');
const router = express.Router();

const BancoController = require('../controllers/BancoController');

router.get('/list',BancoController.list);
router.post('/create',BancoController.create);
router.get('/get/:id', BancoController.get);
router.put('/update/:id',BancoController.update);
router.delete('/delete/:id',BancoController.delete);
router.get('/list_banco_motorista/:logid/:perfilId',BancoController.list_banco_motorista);

module.exports = router;