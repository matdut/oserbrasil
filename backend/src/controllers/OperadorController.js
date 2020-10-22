const controllers = {}

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// import model and sequelize
var sequelize = require('../model/database');
var Operador = require('../model/Operador');
var Status = require('../model/Status');
var Empresa = require('../model/Empresa');
var Permissao = require('../model/Permissoes');
//var Role = require('../model/Role');

// para migrar por si no tiene tablas
sequelize.sync()


controllers.delete = async (req,res) => {

  const { id } = req.params;  
  await Operador.destroy({
    where: { id: id }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});

  })

}
controllers.deleteEmpresa = async (req,res) => {

  const { empresaId } = req.params;  
  await Operador.destroy({
    where: { empresaId: empresaId }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});

  })

}



controllers.getOperadorCpf = async (req, res) => {
   // mesmo cpf cadastrado na mesma empresa
  
  //const cpf = req.params.email;  
  const cpf = req.params.cpf;            
  const cnpj = req.params.cnpj;            

 // console.log("CPF ==>"+req.params.cpf)
 // console.log("CNPJ ==>"+req.params.cnpj)

  await Operador.findAll({   
    include: [{
      model: Empresa,
      where: { cnpj: cnpj }
     }],                  
     where: { cpf: cpf }     
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
  
  
  controllers.listaIncompletos = async (req,res) => {
   
    const { id } = req.params;  
    
    await Operador.findAll({ 
      include: [
        {
          model: Empresa,
          required: true,
          where: {id: id}
        },
        {
          model: Status          
        }
      ],
      where: { 
        statusId: 6
       }    
    })
    .then( function(data){
      return res.json({success:true, data:data});
    })
    .catch(error => {
       return res.json({success:false});
    })
  
  }

  controllers.listaempresa = async (req,res) => {
   
    const { id } = req.params;  
    console.log("ID ==>"+req.params.id)

    await Operador.findAll({ 
      include: [
        {
          model: Empresa,
          required: true,
          where: {id: id}
        },
        {
          model: Status          
        }
      ],
      where: { 
        statusId: {
          [Op.notIn]: [6,7]             
        }
       }    
    })
    .then( function(data){
      return res.json({success:true, data:data});
    })
    .catch(error => {
       return res.json({success:false});
    })
  
  }

  
  controllers.listExcluidos = async (req,res) => {
    await Operador.findAll({       
      include: [
        { model: Status }, 
        { model: Empresa, required: true}
      ],
      where: { 
       statusId: 7                    
      }    
    })
    .then( function(data){
      return res.json({success:true, data:data});
    })
    .catch(error => {
       return res.json({success:false});
    })
  
  }

  controllers.listarIncompletos = async (req,res) => {
    await Operador.findAll({       
      include: [
        { model: Status }, 
        { model: Empresa, required: true}
      ],
      where: { 
       statusId: 6                    
      }    
    })
    .then( function(data){
      return res.json({success:true, data:data});
    })
    .catch(error => {
       return res.json({success:false});
    })
  
  }
controllers.list = async (req,res) => {
  await Operador.findAll({       
    include: [
      { model: Status }, 
      { model: Empresa, required: true}
    ],
    where: { 
     statusId: {
       [Op.notIn]: [6,7]             
     }
    }    
  })
  .then( function(data){
    return res.json({success:true, data:data});
  })
  .catch(error => {
     return res.json({success:false});
  })

}

controllers.get = async (req, res) => {
  const { id } = req.params;
  await Operador.findAll({
    include: [{ model: Empresa }],
     where: { id: id}
  })
  .then( function(data){
    return res.json({success:true, data:data});
  })
  .catch(error => {
     return res.json({success:false});
  })
  
}

controllers.getEmpresaOperador = async (req, res) => {
  const { idEmpresa } = req.params;
  await Operador.findAll({
    include: [{ 
       model: Empresa,
       where: { id: idEmpresa }  
     }]
  })
  .then( function(data){
    return res.json({success:true, data:data});
  })
  .catch(error => {
     return res.json({success:false});
  })
  
}

controllers.getEmail = async (req, res) => {
  const { email } = req.params;
  await Operador.findAll({
    include: [{ model: Empresa }],
     where: { email: email}
  })
  .then( function(data){
    return res.json({success:true, data:data});
  })
  .catch(error => {
     return res.json({success:false});
  })
  
}

controllers.create = async (req,res) => {  

  // DATA parametros desde post
  const { nome, email,cpf,senha,data_nascimento, telefone,celular, empresaId, statusId, perfilId } = req.body;
  	
  //console.log("ROle es ==>"+role)
  //create
  await Operador.create({
    nome: nome,              
    email: email,
    senha: senha,
    cpf: cpf,
    data_nascimento: data_nascimento,
    celular: celular,
    telefone: telefone,
    empresaId: empresaId,
    statusId: statusId,
    perfilId: perfilId
  })
  .then( function (data){
    return res.json({success:true, data: data, message:"Operador salvo com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })  

}

controllers.update = async (req, res) => {
  // parameter id get  
  const { id } = req.params;
  //const { clienteId } = req.params;

  // parameter post
  const {  nome, email,cpf,senha,telefone,data_nascimento, celular, empresaId, statusId, perfilId } = req.body;
  // update   
  
  await Operador.update({
    nome: nome,              
    email: email,
    senha: senha,
    cpf: cpf,
    celular: celular,
    data_nascimento: data_nascimento,
    telefone: telefone,
    empresaId: empresaId,
    statusId: statusId, 
    perfilId: perfilId  
  },{
    where: { id: id} 
  })
  .then( function (data){
    return res.json({success:true, data: data, message:"Operador atualizado com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

module.exports = controllers;
