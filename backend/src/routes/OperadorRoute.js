const express = require('express');
const router = express.Router();

const OperadorController = require('../controllers/OperadorController');

router.get('/list',OperadorController.list);
router.get('/listExcluidos',OperadorController.listExcluidos);
router.get('/listarIncompletos',OperadorController.listarIncompletos);
router.post('/create',OperadorController.create);
router.get('/get/:id', OperadorController.get);
router.get('/getEmpresaOperador/:idEmpresa', OperadorController.getEmpresaOperador);
router.get('/getEmail/:email', OperadorController.getEmail);
router.put('/update/:id', OperadorController.update);
router.delete('/delete/:id',OperadorController.delete);
router.get('/getOperadorCpf/:cpf/:cnpj', OperadorController.getOperadorCpf);
router.get('/listaempresa/:id', OperadorController.listaempresa);
//router.get('/listaempresa/:id', OperadorController.listaIncompletos);

router.delete('/deleteEmpresa/:empresaId',OperadorController.deleteEmpresa);



module.exports = router;
