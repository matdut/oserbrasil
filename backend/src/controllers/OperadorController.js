const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Operador = require('../model/Operador');
//var Role = require('../model/Role');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.list = async (req,res) => {
  await Operador.findAll({
  })
  .then( function(data){
    return res.json({success:true, data:data});
  })
  .catch(error => {
     return res.json({success:false});
  })

}

controllers.get = async (req, res) => {
  const { id } = req.params;
  await Operador.findAll({
    where: { id: id}
    //,
    //include: [ Role ]
  })
  .then( function(data){
    return res.json({success:true, data:data});
  })
  .catch(error => {
     return res.json({success:false});
  })
  
}

controllers.create = async (req,res) => {  

  // DATA parametros desde post
  const { nome, email, cpf, senha, telefone, clienteId } = req.body;
  //console.log("ROle es ==>"+role)
  //create
  await Operador.create({
    nome: nome,              
    email: email,
    senha: senha,
    cpf: cpf,
    telefone: telefone,
    clienteId: clienteId
  })
  .then( function (data){
    return res.json({success:true, data: data, message:"Operador salvo com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })  

}

controllers.update = async (req, res) => {
  // parameter id get  
  const { id } = req.params;
  const { clienteId } = req.params;

  // parameter post
  const { nome, email, cpf, senha, telefone } = req.body;
  // update data
  
  await Operador.update({
    nome: nome,              
    email: email,
    senha: senha,
    cpf: cpf,
    telefone: telefone    
  },{
    where: { id: id,  clienteId: clienteId} 
  })
  .then( function (data){
    return res.json({success:true, data: data, message:"Operador atualizado com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

module.exports = controllers;
