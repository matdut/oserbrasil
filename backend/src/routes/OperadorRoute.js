const express = require('express');
const router = express.Router();

const OperadorController = require('../controllers/OperadorController');

router.get('/list',OperadorController.list);
router.post('/create',OperadorController.create);
router.get('/get/:id', OperadorController.get);
router.get('/getEmail/:email', OperadorController.getEmail);
router.put('/update/:id', OperadorController.update);
router.delete('/delete/:id',OperadorController.delete);
router.get('/getOperadorCpf/:cpf/:cnpj', OperadorController.getOperadorCpf);
router.get('/listaempresa/:id', OperadorController.listaempresa);

module.exports = router;
