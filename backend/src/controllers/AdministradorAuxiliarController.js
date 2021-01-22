const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var AdministradorAuxiliar = require('../model/Administrador_auxiliar');
var Status = require('../model/Status');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.list = async (req,res) => {
  await AdministradorAuxiliar.findAll({
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
}
controllers.listExcluidos = async (req,res) => {
  await AdministradorAuxiliar.findAll({
    include: [{ model: Status  }],
    where: { 
     statusId: 7
    }
   })
   .then( function (data){
    if (data.length > 0) {
      return res.json({success:true, data:data});
     } else {
      return res.json({success:false, data:data});
     }  
   })
   .catch(error => {
     return res.json({success:false, message: error});
   })
  
 }

 controllers.listarIncompletos = async (req,res) => {
  await AdministradorAuxiliar.findAll({
    include: [{ model: Status  }],
    where: { 
     statusId: 6
    }
   })
   .then( function (data){
    if (data.length > 0) {
      return res.json({success:true, data:data});
     } else {
      return res.json({success:false, data:data});
     }  
   })
   .catch(error => {
     return res.json({success:false, message: error});
   })
  
 }

controllers.create = async (req,res) => {  

  // DATA parametros desde post
  //const { nome, email, senha, celular, cpf, data_nascimento, statusId, perfilId } = req.body;
  //console.log("ROle es ==>"+role)
  //create
  await AdministradorAuxiliar.create(req.body)
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
  
  await AdministradorAuxiliar.update({
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
  await AdministradorAuxiliar.findAll({
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