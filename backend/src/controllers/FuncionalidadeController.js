const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Funcionalidade = require('../model/Funcionalidade');
//var Role = require('../model/Role');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.list = async (req,res) => {
  await Funcionalidade.findAll()
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
}

controllers.create = async (req,res) => {  

  // DATA parametros desde post
  const { nome } = req.body;
  //console.log("ROle es ==>"+role)
  //create
  await Funcionalidade.create({   
    nome: nome
  })
  .then( function (data){
    return res.json({success:true, data: data, message:"Funcionalidade criado com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.update = async (req, res) => {
  // parameter id get  
  const { id } = req.params;

  //console.log('entrou aqui = '+id);

  // parameter post
  const { nome } = req.body;
  // update data
  
  await Funcionalidade.update({
            nome: nome
  },{
    where: { id: id}
  })
  .then( function (data){
    return res.json({success:true, data: data, message:"Funcionalidade atualizado com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.get = async (req, res) => {
  const { id } = req.params;
  await Funcionalidade.findAll({
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
