const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Agencia = require('../model/lista_banco');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.list = async (req,res) => {
  await Agencia.findAll({
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
  const { codigo, descricao } = req.body;
  //console.log("ROle es ==>"+role)
  //create
  await Agencia.create({ 
    codigo: codigo,
    descricao: descricao,     
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

  const { codigo, descricao } = req.body;
  //console.log('entrou aqui = '+id);
  // parameter post
  // update data
  
  await Agencia.update({
    codigo: codigo,
    descricao: descricao,  
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
controllers.getbusca = async (req, res) => {
  const { descricao } = req.params;
  await Agencia.findAll({
    where: { descricao: descricao}  
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
  await Agencia.findAll({
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