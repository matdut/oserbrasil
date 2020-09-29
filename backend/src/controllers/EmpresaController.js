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

  console.log('entrou aqui = '+id);

  // parameter post
  const { inscricao_municipal, statusId,
    contato, cnpj, inscricao_estadual, razao_social, nome_fantasia, situacaoId, clienteId,
     endereco, numero, complemento, telefone1, telefone2, celular, cidade, bairro, estadoId, cep} = req.body;
  // update data
  
  await Empresa.update({            
            contato: contato,
            cnpj: cnpj,
            razao_social: razao_social,
            inscricao_estadual: inscricao_estadual,
            inscricao_municipal: inscricao_municipal,
            nome_fantasia: nome_fantasia,
            endereco: endereco,
            numero: numero,
            complemento: complemento,
            telefone1: telefone1,
            telefone2: telefone2,
            celular: celular,
            cidade: cidade,
            bairro: bairro,
            estadoId: estadoId,
            cep: cep,            
            statusId: statusId,
            situacaoId: situacaoId,
            clienteId: clienteId 
  },{
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
   select: "",  
   include: [
     { 
      model: Cliente,
          where: { 
            statusId: {
              [Op.notIn]: [7]             
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

  // DATA parametros desde post
  const {inscricao_municipal, statusId,
    contato, cnpj, inscricao_estadual, razao_social, nome_fantasia, situacaoId,
     endereco, numero, complemento, cep, celular, cidade, bairro, estadoId, clienteId } = req.body;
  //console.log("ROle es ==>"+role)
  //create
  await Empresa.create({    
    cnpj: cnpj,
    razao_social: razao_social,
    inscricao_estadual: inscricao_estadual,
    inscricao_municipal: inscricao_municipal,
    nome_fantasia: nome_fantasia,    
    endereco: endereco,
    numero: numero,
    complemento: complemento,
    celular: celular,
    cidade: cidade,
    bairro: bairro,
    estadoId: estadoId,
    cep: cep,            
    statusId: statusId,
    situacaoId: situacaoId, 
    clienteId: clienteId
  })
  .then( function (data){      
    
       return res.json({success:true, data:data});
   
  })
  .catch(error => {
    return res.json({success:false, error: error});
  })
}

module.exports = controllers;
