const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
//const upload = multer({ dest: 'uploads/' });

const MotoristaServicoController = require('../controllers/MotoristaServicoController');

router.get('/list/:servicoId',MotoristaServicoController.list);
router.post('/create', MotoristaServicoController.create);
router.get('/get/:id', MotoristaServicoController.get);
router.put('/update/:id', MotoristaServicoController.update);
router.delete('/delete/:servicoId',MotoristaServicoController.delete);
router.get('/getMotoristaServico/:motoristaId/:tipo', MotoristaServicoController.getMotoristaServico);
router.get('/getMotoristaServicoAtivos/:motoristaId/:motorista_perfil', MotoristaServicoController.getMotoristaServicoAtivos);
router.get('/getServico/:servicoId', MotoristaServicoController.getServico);
router.get('/totalServicosMotorista/:motoristaId', MotoristaServicoController.totalServicosMotorista);

module.exports = router;
