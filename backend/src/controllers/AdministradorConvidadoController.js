const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var AdministradorConvidado = require('../model/Administrador_auxiliar');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.list = async (req,res) => {
  await AdministradorConvidado.findAll({
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
}

controllers.create = async (req,res) => {  

  // DATA parametros desde post
  const { nome, email, senha, celular, cpf, data_nascimento, statusId, perfilId } = req.body;
  //console.log("ROle es ==>"+role)
  //create
  await AdministradorConvidado.create({ 
    nome: nome, 
    email: email, 
    senha: senha, 
    celular: celular,
    cpf: cpf,
    data_nascimento: data_nascimento, 
    situacaoId: statusId,
    perfilId: perfilId, 
    statusId: statusId, 
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.update = async (req, res) => {
  // parameter id get  
  const { id } = req.params;

  const { nome, email, senha, celular, cpf, data_nascimento, statusId, perfilId } = req.body;
  //console.log('entrou aqui = '+id);
  // parameter post
  // update data
  
  await AdministradorConvidado.update({
    nome: nome, 
    email: email, 
    senha: senha, 
    celular: celular,
    cpf: cpf,
    data_nascimento: data_nascimento, 
    situacaoId: statusId,
    perfilId: perfilId, 
    statusId: statusId, 
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

controllers.get = async (req, res) => {
  const { id } = req.params;
  await AdministradorConvidado.findAll({
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

module.exports = controllers;
