const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/LoginController');

router.get('/list',LoginController.list);
router.get('/getLogin/:email/:senha', LoginController.getLogin);
router.get('/get/:id', LoginController.get);
router.get('/getEmail/:email', LoginController.getEmail);
router.put('/update/:id',LoginController.updatelog);
router.post('/create',LoginController.create);
router.delete('/delete/:email',LoginController.delete);

//router.get('/getMotorista/:email/:senha', LoginController.getMotorista);
//router.get('/getMotoristaEmail/:email', LoginController.getMotoristaEmail);
//router.get('/getClienteEmail/:email', LoginController.getClienteEmail);
//router.get('/getOperadorEmail/:email', LoginController.getOperadorEmail);
//router.get('/getClienteSenha/:senha', LoginController.getClienteSenha);
//router.get('/getOperador/:email/:senha', LoginController.getOperador);

module.exports = router;
