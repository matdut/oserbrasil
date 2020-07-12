const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/LoginController');

router.get('/list',LoginController.list);
router.get('/get/:email/:senha', LoginController.get);
router.get('/getMotorista/:email/:senha', LoginController.getMotorista);
router.get('/getMotoristaEmail/:email', LoginController.getMotoristaEmail);
router.get('/getClienteEmail/:email', LoginController.getClienteEmail);

module.exports = router;
