const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Estado = require('../model/Estado');
//var Role = require('../model/Role');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.list = async (req,res) => {
  await Estado.findAll({
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error.message});
  })
 
}

controllers.create = async (req,res) => {  

  // DATA parametros desde post
  const { nome } = req.body;
  //console.log("ROle es ==>"+role)
  //create
  await Estado.create({   
    nome: nome
  })
  .then( function (data){
    return res.json({success:true, data: data, message:"Estado criado com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error.message});
  })

}

controllers.update = async (req, res) => {
  // parameter id get  
  const { id } = req.params;

  //console.log('entrou aqui = '+id);

  // parameter post
  const { nome } = req.body;
  // update data
  
  await Estado.update({
            nome: nome
  },{
    where: { id: id}
  })
  .then( function (data){
    return res.json({success:true, data: data, message:"Estado atualizado com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.get = async (req, res) => {
  const { estado } = req.params;
  await Estado.findAll({
    where: { nome: estado}
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
