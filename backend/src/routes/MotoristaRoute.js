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
router.get('/getMotoristaServico/:estado_motorista/:bilingue', MotoristaController.getMotoristaServico);

/*
router.post('/file/upload'), multer(multerConfig).single('file'), async (req, res) => {

    console.log('req.file '+JSON.stringify(req.file, null, "    "));  

    return res.json({hello: 'incluido '});
}
*/
/*
router.put("/foto/update/:id", multer(multerConfig).single('file'), async (req, res) => {
   
  console.log('req.file foto/update - '+JSON.stringify(req.file, null, "    "));  

  const { originalname: name, mimetype, size, filename: key, location: url = ""} = req.file;
  //console.log(req.file); 
  
  const id = req.params.id;     

  const url2 = req.protocol + '://' + req.get('host')  
  //console.log('entrou aqui = '+id);
  // update data
  
  await Motorista.update({
    foto_name: name,
    foto_size: size,
    foto_key: key,
    foto_mimetype: mimetype,
    foto_url: url2 + '/tmp/uploads/'+ key         
    },{
    where: { id: id}
    })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

});

*/
/*
router.put('/documentoCNH/update/:id', multer(multerConfig).single('file'), async (req, res) => {
// console.log('req.file documentoCNH - '+JSON.stringify(req.file, null, "    "));  
  
  const { originalname: name, mimetype, size, filename: key, location: url = ""} = req.file;   
  
  const id = req.params.id;     

  const url2 = req.protocol + '://' + req.get('host')  
   
  await Motorista.update({
    foto_CNH_name: name,
    foto_CNH_size: size,
    foto_CNH_key: key,
    foto_CNH_mimetype: mimetype,
    foto_CNH_url: url2 + '/tmp/uploads/' + key,  
    },{
    where: { id: id}
    })
  .then( function (data){
    if (req.file) {
      return res.json({success:true, data: data});
    } else {
      return res.json({success:false, mensagem: 'Houve erro no upload!'});     
    }     
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

});

*/
/*
router.put("/update/:id", multer(multerConfig).single('file'), async (req, res) => {
  
  console.log('ENTROU NO METODO');  
  // parameter id get  
  const { id } = req.params.id;

  console.log('id -'+JSON.stringify(id, null, "    "));  
  // parameter post
  const { originalname: name, size, filename: key, location: url = ""} = req.file;
  //const { foto_name, foto_size, foto_key, foto_url} = req.file;
  
  const url2 = req.protocol + '://' + req.get('host')  
  
  console.log('motorista file -'+JSON.stringify(req.file, null, "    "));         
  console.log('motorista body -'+JSON.stringify(req.body, null, "    "));    

    // update data  
  await Motorista.update({
    foto_name: name,
    foto_size: size, 
    foto_key: key, 
    foto_url: '/tmp/uploads/' + req.file.filename  
  },{
    where: { id: id}
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

});
*/
/*
router.post("/create", multer(multerConfig).single("file"), async (req, res) => {
     
    // alert("chegou aqui");     

 
    const { originalname: name, size, filename: key, location: url} = req.file;
    
    //const { originalname: name, size, filename: key, location: url = ""} = req.file;
    
    const url2 = req.protocol + '://' + req.get('host')  

    const { nome, email, endereco, telefone1, numero,
        telefone2, senha, complemento,  celular, cidade, apolice, seguradoraId,
        bairro, estadoId, cep, cpf, data_nascimento, carro, placa,
        ano, cor, bilingue, indicacao, situacaoId, perfilId, foto_name, foto_size, foto_key, foto_url} = req.body;
 
    //console.log(JSON.stringify('motorista route -'+req.file, null, "    "));         
    //console.log(JSON.stringify('motorista route -'+req.body, null, "    "));    
  
    //console.log(JSON.stringify('motorista route -'+req.file, null, "    ")); 
     await Motorista.create({
            nome: nome,              
            email: email,
            senha: senha,
            endereco: endereco,
            numero: numero,
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
