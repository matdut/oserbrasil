const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var EmailOperador = require('../model/email_operador');
var Status = require('../model/Status');
//var Role = require('../model/Role');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.delete = async (req,res) => {

  const { id } = req.params;  

  await EmailOperador.destroy({
    where: { id: id }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});   
  })

}

controllers.deleteEmail = async (req,res) => {

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

controllers.listMotorista = async (req,res) => {
  //const { id } = req.params;
  await EmailOperador.findAll({
    include: [{ model: Status  }],
    where: { perfilId: 3}    
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

controllers.listMotoristaAux = async (req,res) => {
  const { id } = req.params;

  await EmailOperador.findAll({
    include: [{ model: Status  }],
    where: { perfilId: 9,  empresaId: id }    
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}


controllers.listAdministrador = async (req,res) => {
  //const { id } = req.params;
  await EmailOperador.findAll({
    include: [{ model: Status  }]
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
  const { email, empresaId, statusId, gerenciar_eventos, monitorar_eventos,
    representante_legal, eventoId, perfilId } = req.body;
     
  //console.log('entrou aqui clienteId = '+clienteId);
  await EmailOperador.create({
    email: email,              
    empresaId: empresaId,          
    perfilId: perfilId,
    eventoId: eventoId,    
    statusId: statusId,    
    gerenciar_eventos: gerenciar_eventos, 
    monitorar_eventos: monitorar_eventos,   
    representante_legal: representante_legal,
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
  const { email, empresaId, statusId, gerenciar_eventos, monitorar_eventos,
    representante_legal, eventoId, perfilId } = req.body;
  // parameter post
  
  await Cartao.update({
    email: email,              
    empresaId: empresaId,          
    perfilId: perfilId,
    eventoId: eventoId,    
    statusId: statusId,    
    gerenciar_eventos: gerenciar_eventos,     
    monitorar_eventos: monitorar_eventos,   
    representante_legal: representante_legal,
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
