const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const Motorista = require("../model/Motorista");

const MotoristaController = require('../controllers/MotoristaController');

router.get('/list',MotoristaController.list);
router.post('/create', multer(multerConfig).single("file"), MotoristaController.create);
router.get('/get/:id', MotoristaController.get);
router.put('/update/:id',MotoristaController.update);
router.delete('/delete/:id',MotoristaController.delete);

/*
router.post("/create", multer(multerConfig).single("file"), async (req, res) => {
     
    // alert("chegou aqui");     

 
    const { originalname: name, size, filename: key, location: url} = req.file;
    
    //const { originalname: name, size, filename: key, location: url = ""} = req.file;
    
    const url2 = req.protocol + '://' + req.get('host')  

    const { nome, email, endereco, telefone1,
        telefone2, senha, complemento,  celular, cidade, apolice, seguradoraId,
        bairro, estadoId, cep, cpf, data_nascimento, carro, placa,
        ano, cor, bilingue, indicacao, situacaoId, perfilId} = req.body;
 
    //console.log(JSON.stringify('motorista route -'+req.file, null, "    "));         
    //console.log(JSON.stringify('motorista route -'+req.body, null, "    "));    
  
    //console.log(JSON.stringify('motorista route -'+req.file, null, "    ")); 
     await Motorista.create({
            nome: nome,              
            email: email,
            senha: senha,
            endereco: endereco,
            complemento: complemento,
            telefone1: telefone1,
            telefone2: telefone2,
            celular: celular,
            cidade: cidade,
            bairro: bairro,
            estadoId: estadoId,
            cep: cep,           
            cpf: cpf,
            data_nascimento: data_nascimento,
            ano: ano,
            cor: cor,
            bilingue: bilingue,
            indicacao: indicacao,            
            carro: carro,
            placa: placa,
            estadoId: estadoId, 
            perfilId: perfilId,
            situacaoId: situacaoId,
            apolice: apolice, 
            seguradoraId: seguradoraId,
            foto_name: name,
            foto_size: size,
            foto_key: key,
            foto_mimetype: "",
            foto_url: url2 + '/tmp/uploads/' + key
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
