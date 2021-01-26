const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const Veiculo = require("../model/veiculo_motorista_preferido");

const VeiculoMotPrefController = require('../controllers/Veiculo_Motorista_preferidoController');

router.get('/list',VeiculoMotPrefController.list);
router.get('/lista_veiculos/:id',VeiculoMotPrefController.lista_veiculos);
router.post('/create',VeiculoMotPrefController.create);
router.get('/get/:id', VeiculoMotPrefController.get);
router.get('/getVeiculo/:id', VeiculoMotPrefController.getVeiculo);
router.put('/update/:id',VeiculoMotPrefController.update);
router.delete('/delete/:id',VeiculoMotPrefController.delete);
router.delete('/deleteMotorista/:id',VeiculoMotPrefController.deleteMotorista);
router.get('/getMotoristaVeiculos/:id', VeiculoMotPrefController.getMotoristaVeiculos);
//router.put("/documentoCRVL/update/:id", multer(multerConfig).single('file'), VeiculoController.uploadCRVLFiles);
router.put("/documentoCRVL/update/:id/:motoristaId", VeiculoMotPrefController.uploadCRVLFiles);
router.get('/getVeiculoSelecionado/:id/:tipoTransporte', VeiculoMotPrefController.getVeiculoSelecionado);



module.exports = router;
