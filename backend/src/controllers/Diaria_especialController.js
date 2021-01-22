const controllers = {}

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// import model and sequelize
var sequelize = require('../model/database');
var Diaria_especial = require('../model/Diaria_especial');
var Tipo = require('../model/Tipo_transporte');
//const generateUniqueId = require('../utils/generateUniqueId'); 

// para migrar por si no tiene tablas
sequelize.sync()

controllers.delete = async (req,res) => {
  
  // parameter post  
  const { id } = req.params;  
 // console.log( JSON.stringify(req.params, null, "    ") ); 

  //console.log('delete id  - '+id);
  // delete sequelize
  await Diaria_especial.destroy({
    where: { id: id }
  }).then( function (data){
    return res.json({success:true, data: data});
    //return data;
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  })
   //res.json({success:true, deleted:del, message:"Deleted successful"});

}

controllers.list = async (req,res) => {
  await Diaria_especial.findAll({        
    order: 
    [ 
     [sequelize.literal('tipoTransporte, faixa_inicial'), 'asc']   
    ]    
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
}

controllers.create = async (req,res) => {  


  //create
  await Diaria_especial.create(req.body)
  .then( function (data){
    return res.json({success:true, data: data, message:"Matriz_tarifaria criado com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.update = async (req, res) => {
  // parameter id get  
  const { id } = req.params;  
  
  await Diaria_especial.update(req.body)
  .then( function (data){
    return res.json({success:true, data: data, message:"Matriz_tarifaria atualizado com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.get = async (req, res) => {
  const { id } = req.params;  

  // Find all projects with a least one task where task.state === project.task
 await Diaria_especial.findAll({ 
  where: { id: id }//.  id: id //,
   //include: [Tipo]
  })  
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

controllers.listbusca = async (req, res) => {
 // const { id } = req.params;  

  const { data_servico } = req.body;

  // Find all projects with a least one task where task.state === project.task
 await Diaria_especial.findAll({ 
  where: {   
    data_inicial: {      
      [Op.and]: {
        [Op.gte]: data_servico,
        [Op.lte]: data_servico
      }
    },
    data_final: {      
      [Op.and]: {
        [Op.gte]: data_servico,
        [Op.lte]: data_servico
      }
    }   
  }//.  id: id //,
   //include: [Tipo]
  })  
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

module.exports = controllers;
