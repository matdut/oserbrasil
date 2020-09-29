const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const Veiculo = require("../model/veiculo_motorista");

const VeiculoController = require('../controllers/Veiculo_MotoristaController');

router.get('/list',VeiculoController.list);
router.get('/lista_veiculos/:id',VeiculoController.lista_veiculos);
router.post('/create',VeiculoController.create);
router.get('/get/:id', VeiculoController.get);
router.get('/getVeiculo/:id', VeiculoController.getVeiculo);
router.put('/update/:id',VeiculoController.update);
router.delete('/delete/:id',VeiculoController.delete);
router.delete('/deleteMotorista/:id',VeiculoController.deleteMotorista);
router.get('/getMotoristaVeiculos/:id', VeiculoController.getMotoristaVeiculos);
//router.put("/documentoCRVL/update/:id", multer(multerConfig).single('file'), VeiculoController.uploadCRVLFiles);
router.put("/documentoCRVL/update/:id/:motoristaId", VeiculoController.uploadCRVLFiles);
/*
router.put('/documentoCRVL/update/:id', multer(multerConfig).single('file'), async (req, res) => {
//    console.log('req.file documentoCRVL/update - '+JSON.stringify(req.file, null, "    "));  
    const { originalname: name, mimetype, size, filename: key, location: url = ""} = req.file;
    
    const id = req.params.id;     
  
    const url2 = req.protocol + '://' + req.get('host')  
    console.log('entrou aqui = '+id);
    // update data
    
    await Veiculo.update({   
      foto_CRVL_name: name,
      foto_CRVL_size: size,
      foto_CRVL_key: key,
      foto_CRVL_mimetype: mimetype,
      foto_CRVL_url: url2 + '/tmp/uploads/' + req.file.filename          
  
      },{
      where: { motoristaId: id}
      })
    .then( function (data){
      return res.json({success:true, data: data});
    })
    .catch(error => {
      return res.json({success:false, message: error});
    })
  
  });
*/  

module.exports = router;
