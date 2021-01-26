const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
//const upload = multer({ dest: 'uploads/' });

const MotoristaPreferidoController = require('../controllers/MotoristaPreferidoController');

router.get('/list',MotoristaPreferidoController.list);
router.get('/listExcluidos',MotoristaPreferidoController.listExcluidos);
router.get('/listarIncompletos',MotoristaPreferidoController.listarIncompletos);
router.post('/create', MotoristaPreferidoController.create);
router.get('/get/:id', MotoristaPreferidoController.get);
router.get('/getMotVeiculo/:id', MotoristaPreferidoController.getMotVeiculo);
router.put('/update/:id', MotoristaPreferidoController.update);
router.get('/getEmail/:email', MotoristaPreferidoController.getEmail);
router.delete('/delete/:id',MotoristaPreferidoController.delete);
router.get('/getMotoristaCpf/:cpf', MotoristaPreferidoController.getMotoristaCpf);
router.post('/file/upload', multer(multerConfig).single('file'), MotoristaPreferidoController.upload);
//router.post('/foto/update/:id', multer(multerConfig).single('file'), MotoristaController.uploadFotoFiles);
router.put('/foto/update/:id', MotoristaPreferidoController.uploadFotoFiles);
//router.put('/documentoCNH/update/:id', multer(multerConfig).single('file'), MotoristaController.uploadCNHFiles);
router.put('/documentoCNH/update/:id', MotoristaPreferidoController.uploadCNHFiles);
router.get('/getSelecionaMotorista/:estado_motorista/:bilingue', MotoristaPreferidoController.getSelecionaMotorista);
router.get('/getSelTodosMotorista/:estado_motorista/:empresaId', MotoristaPreferidoController.getSelTodosMotorista);
router.get('/getMotVeiculoTipo/:id/:tipoTransporte', MotoristaPreferidoController.getMotVeiculoTipo);


module.exports = router;
