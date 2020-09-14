const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Funcionalidade = require('../model/Funcionalidade');
var Perfil = require('../model/Perfil');
//var Role = require('../model/Role');

// para migrar por si no tiene tablas
sequelize.sync()


controllers.delete = async (req,res) => {
  
  // parameter post  
  const { id, perfilId } = req.params;  
 
  await Funcionalidade.destroy({
    where: { id: id, perfilId: perfilId }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  }) 

}

controllers.list = async (req,res) => {
  await Funcionalidade.findAll({
    include: [{ model: Perfil  }],
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
  const { descricao, perfilId } = req.body;
  //console.log("ROle es ==>"+role)
  //create
  await Funcionalidade.create({   
    perfilId: perfilId,
    descricao: descricao
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
  const { descricao, perfilId } = req.body;
  // update data
  
  await Funcionalidade.update({
    perfilId: perfilId,
    descricao: descricao
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

controllers.getPerfil = async (req, res) => {
  const { perfilId } = req.params;
  
  await Funcionalidade.findAll({
    where: { perfilId: perfilId}
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

controllers.get = async (req, res) => {
  const { perfilId, descricao } = req.params;
  
  await Funcionalidade.findAll({
    where: { perfilId: perfilId, descricao: descricao}
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
