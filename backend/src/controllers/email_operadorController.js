const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var EmailOperador = require('../model/email_operador');
var Status = require('../model/Status');
//var Role = require('../model/Role');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.delete = async (req,res) => {

  const { email } = req.params;  

  await EmailOperador.destroy({
    where: { email: email }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});   
  })

}

controllers.list = async (req,res) => {
  const { id } = req.params;
  await EmailOperador.findAll({
    include: [{ model: Status  }],
    where: { empresaId: id}    
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
  await EmailOperador.findAll({
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

controllers.getEmpresa = async (req, res) => {
  const { id, email } = req.params;
  await EmailOperador.findAll({
    where: { id: id, email: email}
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

controllers.getemail = async (req, res) => {
  const { email } = req.params;
  await EmailOperador.findAll({
    where: { email: email}   
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
  const { email, empresaId, statusId, gerenciar_eventos, gerenciar_todos_eventos, 
    incluir_cartao, visualizar_eventos, efetuar_pagamentos, incluir_outors_operadores, eventoId } = req.body;
     
  //console.log('entrou aqui clienteId = '+clienteId);
  await EmailOperador.create({
    email: email,              
    empresaId: empresaId,          
    eventoId: eventoId,    
    statusId: statusId,
    gerenciar_eventos: gerenciar_eventos, 
    gerenciar_todos_eventos: gerenciar_todos_eventos, 
    incluir_cartao: incluir_cartao, 
    visualizar_eventos: visualizar_eventos,
    efetuar_pagamentos: efetuar_pagamentos, 
    incluir_outors_operadores: incluir_outors_operadores,    
  })
  .then( function (data){
    return res.json({success:true, data: data, message:"EmailOperador salvo com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.update = async (req, res) => {
  // parameter id get  
  const { email, empresaId, statusId, gerenciar_eventos, gerenciar_todos_eventos, 
    incluir_cartao, visualizar_eventos, efetuar_pagamentos, incluir_outors_operadores, eventoId } = req.body;
  // parameter post
  
  await Cartao.update({
    email: email,              
    empresaId: empresaId,          
    eventoId: eventoId,    
    statusId: statusId,
    gerenciar_eventos: gerenciar_eventos, 
    gerenciar_todos_eventos: gerenciar_todos_eventos, 
    incluir_cartao: incluir_cartao, 
    visualizar_eventos: visualizar_eventos,
    efetuar_pagamentos: efetuar_pagamentos, 
    incluir_outors_operadores: incluir_outors_operadores,    
  },{
    where: { id: id }
  })
  .then( function (data){
    return res.json({success:true, data: data, message:"EmailOperador atualizado com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

module.exports = controllers;
