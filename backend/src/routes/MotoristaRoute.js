const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const Motorista = require("../model/Motorista");
//const upload = multer({ dest: 'uploads/' });

const MotoristaController = require('../controllers/MotoristaController');

router.get('/list',MotoristaController.list);
router.get('/listExcluidos',MotoristaController.listExcluidos);
router.get('/listarIncompletos',MotoristaController.listarIncompletos);
router.post('/create', MotoristaController.create);
router.get('/get/:id', MotoristaController.get);
router.get('/getMotVeiculo/:id', MotoristaController.getMotVeiculo);
router.put('/update/:id', MotoristaController.update);
router.get('/getEmail/:email', MotoristaController.getEmail);
router.delete('/delete/:id',MotoristaController.delete);
router.get('/getMotoristaCpf/:cpf', MotoristaController.getMotoristaCpf);
router.post('/file/upload', multer(multerConfig).single('file'), MotoristaController.upload);
//router.post('/foto/update/:id', multer(multerConfig).single('file'), MotoristaController.uploadFotoFiles);
router.put('/foto/update/:id', MotoristaController.uploadFotoFiles);
//router.put('/documentoCNH/update/:id', multer(multerConfig).single('file'), MotoristaController.uploadCNHFiles);
router.put('/documentoCNH/update/:id', MotoristaController.uploadCNHFiles);
router.get('/getSelecionaMotorista/:estado_motorista/:bilingue', MotoristaController.getSelecionaMotorista);
router.get('/getSelTodosMotorista/:estado_motorista', MotoristaController.getSelTodosMotorista);
router.get('/getMotVeiculoTipo/:id/:tipoTransporte', MotoristaController.getMotVeiculoTipo);

      
module.exports = router;
