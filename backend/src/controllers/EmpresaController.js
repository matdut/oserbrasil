const controllers = {}

const Sequelize = require('sequelize');

//const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
// import model and sequelize
var sequelize = require('../model/database');
var Empresa = require('../model/Empresa');
var Status = require('../model/Status');
var Cliente = require('../model/Cliente');
sequelize.sync()

controllers.delete = async (req,res) => {
  
  // parameter post  
  const { id } = req.params;  
 
  await Empresa.destroy({
    where: { id: id }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  })
   //res.json({success:true, deleted:del, message:"Deleted successful"});

}

controllers.update = async (req, res) => {
  // parameter id get  
  const { id } = req.params;
   
  await Empresa.update(req.body,{
    where: { id: id}
  })
  .then( function (data){
   
      return res.json({success:true, data:data});
   
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
 
}

controllers.getEmpresaCliente = async (req, res) => {
  const { id } = req.params;
  await Empresa.findAll({    
    include: [
      { 
        model: Cliente,       
        required: true
      }],
   where: { id: id}
  })
  .then( function(data){
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

controllers.getloginEmpresa = async (req, res) => {
  const { id } = req.params;
  await Empresa.findAll({    
    include: [{
      model: Cliente,
      where: { id: id }
     }]    
  })
  .then( function(data){
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

controllers.get = async (req, res) => {
  const { id } = req.params;
  await Empresa.findAll({    
    include: [
      { 
        model: Cliente,       
        required: false
      }],
   where: { id: id}
  })
  .then( function(data){
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

controllers.getEmail = async (req, res) => {
  const { email } = req.params;
  await Empresa.findAll({    
    include: [
      { 
        model: Cliente,       
        required: true,
        where: { email: email}
      }]
   //where: { id: id}
  })
  .then( function(data){
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

controllers.getbuscaempresacnpj = async (req, res) => {
  const { cnpj } = req.params;

  await Empresa.findAll({       
   where: { cnpj: cnpj }
  })
  .then( function(data){
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


controllers.getOperadorCpfRep = async (req,res) => {
//const cpf = req.params.email;  
const cpf = req.params.cpf;            
const cnpj = req.params.cnpj;              
console.log("CPF ==>"+req.params.cpf)
console.log("CNPJ ==>"+req.params.cnpj)

await Empresa.findAll({   
  include: [
    {                                   
      model: Cliente,    
      required: true,  
      where: { cpf: cpf }  
    }],
    where: { cnpj: cnpj }
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

controllers.listExcluidos = async (req,res) => {
  await Empresa.findAll({   
   include: [
     { 
      model: Cliente,
          where: { 
            statusId: 7
        },    
       required: true,  
       include: Status  
     }]    
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
  await Empresa.findAll({   
   include: [
     { 
      model: Cliente,
          where: { 
            statusId: 6
        },    
       required: true,  
       include: Status  
     }]    
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
controllers.list = async (req,res) => {
/*
  await sequelize.query(
    "SELECT CONCAT(SUBSTRING(e.cnpj, 1,2), '.', SUBSTRING(e.cnpj,3,3), '.', SUBSTRING(e.cnpj,6,3), '/', SUBSTRING(e.cnpj,9,4), '-', SUBSTRING(e.cnpj,13, 2)) as cnpj_formatado, "+
    "e.*, c.*,  st.* "+
    " FROM empresas e join clientes c on e.clienteId = c.id join statuses st on st.id = c.statusId "+
    " where c.statusId < 7",
    {      
      type: QueryTypes.SELECT
    }
  )
  */
  await Empresa.findAll({   
   //select: "SUBSTRING(empresa.razao_social, 1, 10) razao_teste",  
   include: [
     { 
      model: Cliente,
          where: { 
            statusId: {
              [Op.notIn]: [6,7]             
            }
        },    
       required: true,  
       include: Status  
     }]    
   }).then( function (data){

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

controllers.getEmpresaCnpj = async (req, res) => {
 
  const cpf = req.params.cpf;  
  const cnpj = req.params.cnpj;            

  await Empresa.findAll({
    include: [{
      model: Cliente,
      where: { cpf: cpf }
     }],
      where: { cnpj: cnpj }//.      
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

   //create
  await Empresa.create(req.body)
  .then( function (data){      
    
       return res.json({success:true, data:data});
   
  })
  .catch(error => {
    return res.json({success:false, error: error});
  })
}

module.exports = controllers;
