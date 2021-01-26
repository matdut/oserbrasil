const controllers = {}

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// import model and sequelize
var sequelize = require('../model/database');
const Estado = require('../model/Estado');
var Motorista_preferido = require('../model/motorista_preferido');
var Status = require('../model/Status');
var Veiculo = require('../model/veiculo_motorista_preferido');
//var Role = require('../model/Role');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.delete = async (req,res) => {
  
  // parameter post  
  const { id } = req.params;  
 // console.log( JSON.stringify(req.params, null, "    ") ); 

  //console.log('delete id  - '+id);
  // delete sequelize
  await Motorista_preferido.destroy({
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


controllers.uploadCNHFiles = async (req, res) => {
  
 // const { originalname: name, mimetype, size, filename: key, location: url = ""} = req.file;
 const { foto_url, name} = req.body;  
  
 const id = req.params.id;     

 //const url2 = req.protocol + '://' + req.get('host')  
 
  await Motorista_preferido.update({
    foto_CNH_url: foto_url,
   //foto_size: size,
   foto_CNH_name: name,
   foto_CNH_key: name,
  // foto_mimetype: mimetype,  
   //foto_url: url2 + '/tmp/uploads/' + 
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


controllers.upload = async (req, res) => {
  
  console.log('req.file 1 '+JSON.stringify(req.file, null, "    "));  

  return res.json({hello: 'incluido '});

}

controllers.uploadFotoFiles = async (req, res) => {    
  
  const { foto_url,  name} = req.body;  
  
  const id = req.params.id;     

  //const url2 = req.protocol + '://' + req.get('host')  
  
   await Motorista_preferido.update({
    foto_url: foto_url,
    //foto_size: size,
    foto_name: name,
    foto_key: name,
   // foto_mimetype: mimetype,  
    //foto_url: url2 + '/tmp/uploads/' + 
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


controllers.getEmail = async (req, res) => {
 
  //const cpf = req.params.email;  
  const email = req.params.email;            

  await Motorista_preferido.findAll({
      where: { email: email }//. 
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

controllers.getMotoristaCpf = async (req, res) => {
 
  //const cpf = req.params.email;  
  const cpf = req.params.cpf;            

  await Motorista_preferido.findAll({
      where: { cpf: cpf }//. 
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

controllers.update = async (req, res) => {

//  console.log('ENTROU NO METODO');  
  // parameter id get  
  const { id } = req.params;

  await Motorista_preferido.update(req.body,{
    where: { id: id}
  })
  .then( function (data){
 
     return res.json({success:true, data:data});
 
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

controllers.get = async (req, res) => {
  const { id } = req.params;
  await Motorista_preferido.findAll({
    where: { 
      id: id     
    },
   // include: [ Role ]
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

controllers.getMotVeiculo = async (req, res) => {
  const { id } = req.params;
  await Motorista_preferido.findAll({
    include: [{ model: Veiculo, where: {motoristaId: id} }],
    where: { id: id }
    //,
    //include: [ Role ]
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

controllers.getMotVeiculoTipo = async (req, res) => {
  const { id, tipoTransporte } = req.params;
  await Motorista_preferido.findAll({
    include: [{ model: Veiculo, where: {motoristaId: id, tipoTransporte: tipoTransporte} }],  
    where: { 
      id: id  
     }
    //,
    //include: [ Role ]
  })
  .then( function (data){
    if (data.length > 0) {
      return res.json({success:true, data:data, total: data.length});
     } else {
      return res.json({success:false, data:data});
     }
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}



controllers.getSelecionaMotorista = async (req, res) => {
 const { estado_motorista, bilingue } = req.params;
 // const { bilingue } = req.params;
  
  await Motorista_preferido.findAll({
 //  include: [{ model: Status, where: {id: 1}  }],
   include: [{ model: Estado, where: {nome: estado_motorista}  }],  
  // include: [{ model: Veiculo }],
    where: { 
      bilingue: bilingue, 
      statusId: 1
    //  receptivo: receptivo 
    }
   
  })
  .then( function (data){
    if (data.length > 0) {
      return res.json({success:true, data:data, total: data.length});
     } else {
      return res.json({success:false, data:data});
     }
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

controllers.getSelTodosMotorista = async (req, res) => {
  const { estado_motorista, empresaId} = req.params;
  // const { bilingue } = req.params;
   
   await Motorista_preferido.findAll({
  //  include: [{ model: Status, where: {id: 1}  }],
    include: [{ model: Estado, where: {nome: estado_motorista}  }],  
   // include: [{ model: Veiculo }],
     where: { 
       statusId: 1,
       empresaId: empresaId,     
     }
    
   })
   .then( function (data){
     if (data.length > 0) {
       return res.json({success:true, data:data, total: data.length});
      } else {
       return res.json({success:false, data:data});
      }
   })
   .catch(error => {
     return res.json({success:false, message: error});
   })
   
 }


controllers.list = async (req,res) => {
 await Motorista_preferido.findAll({
     include: [{ model: Status  }],
     where: { 
      statusId: {
        [Op.notIn]: [6,7]             
      }
   } 
  })
  .then( function (data){
    return res.json({success:true, data:data});    
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
 
}

controllers.listExcluidos = async (req,res) => {
  await Motorista_preferido.findAll({
    include: [{ model: Status  }],
    where: { 
     statusId: 7
    }
   })
   .then( function (data){
     return res.json({success:true, data:data});    
   })
   .catch(error => {
     return res.json({success:false, message: error});
   })
  
 }

 controllers.listarIncompletos = async (req,res) => {
  await Motorista_preferido.findAll({
    include: [{ model: Status  }],
    where: { 
     statusId: 6
    }
   })
   .then( function (data){
     return res.json({success:true, data:data});    
   })
   .catch(error => {
     return res.json({success:false, message: error});
   })
  
 }


//controllers.create, async (req, res) => {
controllers.create = async (req,res) => {  

  // DATA parametros desde post 
  //console.log("ROle es ==>"+role)
  //create
  await Motorista_preferido.create(req.body)
  .then( function (data){
  
      return res.json({success:true, data:data});
  
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

module.exports = controllers;
