const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Cliente = require('../model/Cliente');
var Motorista = require('../model/Motorista');
//var Role = require('../model/Role');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.getMotorista = async (req, res) => {
  
  const email = req.params.email;  
  const senha = req.params.senha; 

  await Motorista.findAll({
      where: { email: email , senha: senha }    
    })
    .then( function (data){
      return res.json({success:true, data: data});
    })
    .catch(error => {
      return res.json({success:false, message: error});
    }) 

} 

controllers.getMotoristaEmail = async (req, res) => {
  
  const email = req.params.email;  

  await Motorista.findAll({
      where: { email: email }    
    })
    .then( function (data){
      return res.json({success:true, data: data});
    })
    .catch(error => {
      return res.json({success:false, message: error});
    }) 

} 

controllers.getClienteEmail = async (req, res) => {
  
  const email = req.params.email;  

  await Cliente.findAll({
      where: { email: email }    
    })
    .then( function (data){
      return res.json({success:true, data: data});
    })
    .catch(error => {
      return res.json({success:false, message: error});
    }) 

} 

controllers.get = async (req, res) => {
 
  //const cpf = req.params.email;  
  const email = req.params.email;  
  const senha = req.params.senha; 
  
  await Cliente.findAll({
      where: { email: email , senha: senha }//. 
      //or: {cpf: email , senha: senha}}   
    })
    .then( function (data){
      return res.json({success:true, data: data});
    })
    .catch(error => {
      return res.json({success:false, message: error});
    })
  
  }

controllers.list = async (req,res) => {
  await Cliente.findAll({
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  }) 
}

module.exports = controllers;
