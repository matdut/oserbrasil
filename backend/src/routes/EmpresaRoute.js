const express = require('express');
const router = express.Router();

const EmpresaController = require('../controllers/EmpresaController');

router.get('/list',EmpresaController.list);
router.get('/listExcluidos',EmpresaController.listExcluidos); 
router.post('/create',EmpresaController.create);
router.get('/get/:id', EmpresaController.get);
router.put('/update/:id',EmpresaController.update);
router.delete('/delete/:id',EmpresaController.delete);
router.get('/getEmpresaCnpj/:cnpj/:cpf', EmpresaController.getEmpresaCnpj);
router.get('/getEmpresaCliente/:id', EmpresaController.getEmpresaCliente);
router.get('/getloginEmpresa/:id', EmpresaController.getloginEmpresa);
router.get('/getOperadorCpfRep/:cpf/:cnpj', EmpresaController.getOperadorCpfRep);

module.exports = router;
