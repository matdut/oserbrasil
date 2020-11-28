const express = require('express');
const router = express.Router();

const email_operadorController  = require('../controllers/email_operadorController');

router.get('/list/:id',email_operadorController.list);
router.get('/listAdministrador',email_operadorController.listAdministrador);
router.get('/listMotorista',email_operadorController.listMotorista);
router.get('/listMotoristaAux/:id',email_operadorController.listMotoristaAux);
router.post('/create',email_operadorController.create);
router.get('/get/:id', email_operadorController.get);
router.get('/getEmpresa/:id/:email', email_operadorController.getEmpresa);
router.get('/getemail/:email', email_operadorController.getemail);
router.put('/update/:id',email_operadorController.update);
router.delete('/delete/:id',email_operadorController.delete);
router.delete('/deleteEmail/:email',email_operadorController.deleteEmail);

module.exports = router;
