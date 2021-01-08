const controllers = {}

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// import model and sequelize
var sequelize = require('../model/database');
var Motorista_selecionados = require('../model/motorista_selecionados');
var Status = require('../model/Status');
//var Role = require('../model/Role');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.delete = async (req,res) => {
  
  // parameter post  
  const { chave_acesso } = req.params;  
 // console.log( JSON.stringify(req.params, null, "    ") ); 

  //console.log('delete id  - '+id);
  // delete sequelize
  await Motorista_selecionados.destroy({
    where: { chave_acesso: chave_acesso }
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

//  console.log('ENTROU NO METODO');  
  // parameter id get  
  const { id } = req.params;

  const { motoristaId, chave_acesso } = req.body; 
//console.log('id -'+JSON.stringify(id, null, "    "));  

  //const { originalname: name, size, filename: key, location: url = ""} = req.file;

  await Motorista_selecionados.update({
    motoristaId: motoristaId,    
    chave_acesso: chave_acesso,
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

controllers.get = async (req, res) => {
  const { id } = req.params;
  await Motorista_selecionados.findAll({
    where: { id: id}
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

controllers.getChave = async (req, res) => {
  const { chave } = req.params;
  await Motorista_selecionados.findAll({
    where: { chave_acesso: chave}
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



controllers.list = async (req,res) => {
 await Motorista_selecionados.findAll({
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


//controllers.create, async (req, res) => {
controllers.create = async (req,res) => {  

  // DATA parametros desde post
  const { motoristaId, chave_acesso } = req.body; 

  //console.log("ROle es ==>"+role)
  //create
  await Motorista_selecionados.create({
    motoristaId: motoristaId,    
    chave_acesso: chave_acesso,
   
  })
  .then( function (data){
  
      return res.json({success:true, data:data});
  
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

module.exports = controllers;
