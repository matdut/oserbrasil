const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Motorista = require('../model/Motorista');
const fs = require("fs");
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
    return res.json({success:true, data: data});
    //return data;
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  })
   //res.json({success:true, deleted:del, message:"Deleted successful"});

}

controllers.update = async (req, res) => {
  // parameter id get  
  const { id } = req.params;

  // parameter post
  const { nome, email, endereco, telefone1,
    telefone2, senha, complemento,  celular, cidade, apolice, seguradoraId,
    bairro, estadoId, cep, cpf, data_nascimento, carro, placa,
    ano, cor, bilingue, foto_blob, indicacao, situacaoId, perfilId} = req.body;
  
    // update data  
  await Motorista.update({
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
    foto_blob: foto_blob,
    indicacao: indicacao,            
    carro: carro,
    placa: placa,
    estadoId: estadoId, 
    perfilId: perfilId,
    situacaoId: situacaoId,
    apolice: apolice, 
    seguradoraId: seguradoraId

  },{
    where: { id: id}
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

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
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

controllers.list = async (req,res) => {
 await Motorista.findAll({
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
 
}
//controllers.create, async (req, res) => {
controllers.create = async (req,res) => {  

  // DATA parametros desde post
  const { nome, email, endereco, telefone1,
    telefone2, senha, complemento,  celular, cidade, apolice, seguradoraId,
    bairro, estadoId, cep, cpf, data_nascimento, carro, placa,
    ano, cor, bilingue, indicacao, situacaoId, perfilId, foto_blob } = req.body;    


  //console.log("ROle es ==>"+role)
  //create
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
            foto_blob: foto_blob
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

module.exports = controllers;
