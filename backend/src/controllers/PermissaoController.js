const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Permissao = require('../model/Permissoes');
var Funcionalidade = require('../model/Funcionalidade');
//var Role = require('../model/Role');

// para migrar por si no tiene tablas
sequelize.sync()


controllers.delete = async (req,res) => {
  
  // parameter post  
  const { id } = req.params;  
 
  await Permissao.destroy({
    where: { id: id }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  }) 

}

controllers.deletaFuncionalidade = async (req,res) => {  
  // parameter post  
  const { perfilId, id, funcId } = req.params; 
 
  await Permissao.destroy({
    where: { perfilId: perfilId, logid: id, funcionalidadeId: funcId }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  }) 

}

controllers.listPerfil = async (req,res) => {
  const { perfilId } = req.params;  

  await Permissao.findAll({
    where: { perfilId: perfilId }
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
}

controllers.lista_acesso = async (req,res) => {
  const { perfilId, id } = req.params;  

  await Permissao.findAll({
    include: [{
      model: Funcionalidade    
     }],    
    where: { perfilId: perfilId, logid: id }
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
  const { logid, perfilId, funcionalidadeId} = req.body;
  //console.log("ROle es ==>"+role)
  //create
  await Permissao.create({   
    logid: logid,
    perfilId: perfilId,
    funcionalidadeId: funcionalidadeId,
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
  const { logid, perfilId, funcionalidadeId} = req.body;
  // update data
  
  await Permissao.update({
    logid: logid,
    perfilId: perfilId,
    funcionalidadeId: funcionalidadeId,
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
  const { logid } = req.params;
  const { perfilId } = req.params;

  await Permissao.findAll({
    where: { logid: logid, perfilId: perfilId }
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

controllers.getFuncionalidade = async (req, res) => {

  const { perfilId, id, funcId } = req.params; 

  console.log('id - '+id)
  console.log('perfilId - '+perfilId)
  console.log('funcId - '+funcId)

  await Permissao.findAll({
    where: { logid: id, perfilId: perfilId, funcionalidadeId: funcId }   
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

module.exports = controllers;
