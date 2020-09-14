const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Motorista = require('../model/Motorista');
var Status = require('../model/Status');
var Veiculo = require('../model/veiculo_motorista');
//var Role = require('../model/Role');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.delete = async (req,res) => {
  
  // parameter post  
  const { id } = req.params;  
 // console.log( JSON.stringify(req.params, null, "    ") ); 

  //console.log('delete id  - '+id);
  // delete sequelize
  await Motorista.destroy({
    where: { id: id }
  }).then( function (data){
    
     return res.json({success:true, data:data});    
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  })
   //res.json({success:true, deleted:del, message:"Deleted successful"});

}


controllers.uploadCNHFiles = async (req, res) => {

  console.log('req.file uploadCNHFiles/update - '+JSON.stringify(req.body, null, "    "));  

 // const { originalname: name, mimetype, size, filename: key, location: url = ""} = req.file;
  const { foto_url,  name} = req.body;  
   
  
  const id = req.params.id;     

  //const url2 = req.protocol + '://' + req.get('host')  
 
  // path: /home/oser/apps_nodejs/backend/tmp/uploads/ 
  
  await Motorista.update({
    foto_CNH_name: name,
    //foto_CNH_size: size,
    foto_CNH_key: name,
    //foto_CNH_mimetype: mimetype,    
    foto_CNH_url: foto_url,  
    },{
    where: { id: id}
    })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
}


controllers.upload = async (req, res) => {
  
  console.log('req.file 1 '+JSON.stringify(req.file, null, "    "));  

  return res.json({hello: 'incluido '});

}

controllers.uploadFotoFiles = async (req, res) => {    
  
  console.log('body uploadFotoFiles/update - '+JSON.stringify(req.body, null, "    "));  

  //const { originalname: name, mimetype, size, filename: key, location: url = ""} = req.file;  
  const { foto_url,  name} = req.body;  
  
  const id = req.params.id;     

  //const url2 = req.protocol + '://' + req.get('host')  
  
   await Motorista.update({
    foto_url: foto_url,
    //foto_size: size,
    foto_name: name,
    foto_key: name,
   // foto_mimetype: mimetype,  
    //foto_url: url2 + '/tmp/uploads/' + 
    },{
    where: { id: id}
    })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })


}

/*
controllers.uploadCRVLFiles = async (req, res) => {
  
  console.log('req.file documentoCRVL/update - '+JSON.stringify(req.file, null, "    "));  

  const { originalname: name, size, filename: key, location: url = ""} = req.file;
  

  const id = req.params.id;     

  const url2 = req.protocol + '://' + req.get('host')  
  console.log('entrou aqui = '+id);
  // update data
  
  await Veiculo.update({   
    foto_CRVL_name: name,
    foto_CRVL_size: size,
    foto_CRVL_key: key,
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

}
*/
controllers.getEmail = async (req, res) => {
 
  //const cpf = req.params.email;  
  const email = req.params.email;            

  await Motorista.findAll({
      where: { email: email }//. 
      //or: {cpf: email , senha: senha}}   
    })
    .then( function (data){      

      if (data.length > 0) {
        return res.json({success:true, data:data});
       } else {
        return res.json({success:false, data:data});
       }   
    })
    .catch(error => {
      return res.json({success:false, message: error});
    })
  
  }

controllers.getMotoristaCpf = async (req, res) => {
 
  //const cpf = req.params.email;  
  const cpf = req.params.cpf;            

  await Motorista.findAll({
      where: { cpf: cpf }//. 
      //or: {cpf: email , senha: senha}}   
    })
    .then( function (data){      

      if (data.length > 0) {
        return res.json({success:true, data:data});
       } else {
        return res.json({success:false, data:data});
       }   
    })
    .catch(error => {
      return res.json({success:false, message: error});
    })
  
  }

controllers.update = async (req, res) => {

//  console.log('ENTROU NO METODO');  
  // parameter id get  
  const { id } = req.params;

  const { nome, email, endereco, telefone1,
    telefone2, senha, numero, complemento,  celular, cidade, apolice, seguradoraId,
    bairro, estadoId, cep, cpf, data_nascimento, carro, modelo ,carroId, modeloId , placa, statusId,
    ano, cor, bilingue, foto_blob, indicacao, situacaoId, perfilId, idioma1, idioma2, data_validade, numero_carteira} = req.body; 
//console.log('id -'+JSON.stringify(id, null, "    "));  

  //const { originalname: name, size, filename: key, location: url = ""} = req.file;

  await Motorista.update({
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
    foto_blob: foto_blob,
    indicacao: indicacao,                
    placa: placa,
    carro: carro,
    modelo: modelo,
    carroId: carroId,
    modeloId: modeloId,
    estadoId: estadoId, 
    perfilId: perfilId,
    situacaoId: situacaoId,
    statusId: statusId,
    apolice: apolice, 
    seguradoraId: seguradoraId,
    idioma1: idioma1,
    idioma2: idioma2,
    data_validade: data_validade, 
    numero_carteira: numero_carteira,
  },{
    where: { id: id}
  })
  .then( function (data){
 
     return res.json({success:true, data:data});
 
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

  // parameter id get  
  

  // parameter post
  /*const { nome, email, endereco, telefone1,
    telefone2, senha, numero, complemento,  celular, cidade, apolice, seguradoraId,
    bairro, estadoId, cep, cpf, data_nascimento, carro, modelo ,placa,
    ano, cor, bilingue, foto_blob, indicacao, situacaoId, perfilId, idioma1, idioma2} = req.body; */
  
    // update data  
/*  await Motorista.update({
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
    foto_blob: foto_blob,
    indicacao: indicacao,            
    carro: carro,
    placa: placa,
    modelo: modelo,
    estadoId: estadoId, 
    perfilId: perfilId,
    situacaoId: situacaoId,
    apolice: apolice, 
    seguradoraId: seguradoraId,
    idioma1: idioma1,
    idioma2: idioma2,
  },{
    where: { id: id}
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  }) */

   //res.json({ success:true, data: data, message: "Updated successful"});  

}

controllers.get = async (req, res) => {
  const { id } = req.params;
  await Motorista.findAll({
    where: { id: id}
    //,
    //include: [ Role ]
  })
  .then( function (data){
    if (data.length > 0) {
      return res.json({success:true, data:data});
     } else {
      return res.json({success:false, data:data});
     }
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}
controllers.list = async (req,res) => {
 await Motorista.findAll({
     include: [{ model: Status  }]
  })
  .then( function (data){
    return res.json({success:true, data:data});    
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
 
}

/*
controllers.putdoc = async (req,res) => {
   
  //console.log('req.file - '+JSON.stringify(req.file, null, "    "));  

  const { originalname: name, size, filename: key, location: url = ""} = req.file;
  //const { originalname: name2, size2, filename: key2, location: url3 = ""} = req.file2;

  console.log(req.file); 
  
  const id = req.params.id;     

  const url2 = req.protocol + '://' + req.get('host')  
  //console.log('entrou aqui = '+id);
  // update data
  
  await Motorista.update({
    foto_CNH_name: name,
    foto_CNH_size: size,
    foto_CNH_key: key,
    foto_CNH_url: url2 + '/tmp/uploads/' + req.file.filename,  
    },{
    where: { id: id}
    })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

};
*/
//controllers.create, async (req, res) => {
controllers.create = async (req,res) => {  

  // DATA parametros desde post
  const { nome, email, endereco, telefone1, numero, 
    telefone2, senha, complemento,  celular, cidade, apolice, seguradoraId,
    bairro, estadoId, cep, cpf, data_nascimento, carro, modelo, carroId, modeloId, placa, statusId,
    ano, cor, bilingue, indicacao, situacaoId, perfilId, foto_blob, idioma1, idioma2, data_validade, numero_carteira } = req.body;    


  //console.log("ROle es ==>"+role)
  //create
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
            modelo: modelo,
            carroid: carroId,
            modeloId: modeloId,
            placa: placa,
            estadoId: estadoId, 
            perfilId: perfilId,
            situacaoId: situacaoId,
            statusId: statusId,
            apolice: apolice, 
            seguradoraId: seguradoraId,
            foto_blob: foto_blob,
            idioma1: idioma1,
            idioma2: idioma2,
            data_validade: data_validade, 
            numero_carteira: numero_carteira,
  })
  .then( function (data){
  
      return res.json({success:true, data:data});
  
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

module.exports = controllers;
