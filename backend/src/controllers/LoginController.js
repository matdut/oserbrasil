const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');

var Login = require('../model/login');
var Motorista = require('../model/Motorista');
var Operador = require('../model/Operador');
//var Role = require('../model/Role');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.getMotorista = async (req, res) => {
  
  const email = req.params.email;  
  const senha = req.params.senha; 

  await Login.findAll({
      where: { 
        email: email, 
        senha: senha 
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


  const {  email, senha, statusId, perfilId, logid } = req.body;
  //console.log("ROle es ==>"+role)
  //create
  await Login.create({
    email: email,
    senha: senha, 
    statusId: statusId,
    perfilId: perfilId,
    logid: logid
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.updatelog = async (req, res) => {
  // parameter id get  
  const { id } = req.params;

  //console.log('entrou aqui = '+id);
  // parameter post
  const { email, senha, statusId, perfilId, logid } = req.body;
  // update data
  
  await Login.update({
    email: email,
    senha: senha, 
    statusId: statusId,
    perfilId: perfilId,
    logid: logid
  },{
    where: { logid: id, perfilId: perfilId, email: email}
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.getOperador = async (req, res) => {
  
  const email = req.params.email;  
  const senha = req.params.senha; 

  await Operador.findAll({
      where: { email: email, 
               senha: senha }
               
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

controllers.getMotoristaEmail = async (req, res) => {
  
  const email = req.params.email;  
  console.log(' BANCO PARAMS - '+req.params.email); 

  await Motorista.findAll({
      where: { email: email }    
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
controllers.getEmail = async (req, res) => {
  
  const email = req.params.email;    

  await Login.findAll({
      where: { email: email }    
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

controllers.getOperadorEmail = async (req, res) => {
  
  const email = req.params.email;  

  await Operador.findAll({
      where: { email: email }    
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

controllers.getClienteEmail = async (req, res) => {
  
  const email = req.params.email;  

  await Cliente.findAll({
      where: { email: email }    
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

controllers.getClienteSenha = async (req, res) => {

  const senha = req.params.senha;  

  await Cliente.findAll({
      where: { senha: senha  }    
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

controllers.getLogin = async (req, res) => {
  const { email } = req.params;
  const { senha } = req.params;
   
  await Login.findAll({
      where: { email: email , senha: senha }       
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

controllers.get = async (req, res) => {
  const { id } = req.params;
 // console.log('req '+JSON.stringify(req.params, null, "    ") ); 
  //console.log('req '+req.params);
  //const cpf = req.params.email;   
  
  await Login.findAll({
      where: { logid: id }//. 
      //or: {cpf: email , senha: senha}}   
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
  await Cliente.findAll({
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

controllers.delete = async (req,res) => {
  
  // parameter post  
  const { email } = req.params;  
 
  await Login.destroy({
    where: { email: email }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  })
   //res.json({success:true, deleted:del, message:"Deleted successful"});

}

module.exports = controllers;
