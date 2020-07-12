const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Matriz_tarifaria = require('../model/Matriz_tarifaria');
var Ocorrencia = require('../model/Ocorrencia');
//const generateUniqueId = require('../utils/generateUniqueId'); 

// para migrar por si no tiene tablas
sequelize.sync()

controllers.list = async (req,res) => {
  await Matriz_tarifaria.findAll({
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
  const { tipo_veiculo, bandeira, receptivo, bilingue, pedagio } = req.body;
  //console.log("ROle es ==>"+role)
  //create
  await Matriz_tarifaria.create({   
    tipo_veiculo: tipo_veiculo,    
    bandeira: bandeira, 
    receptivo: receptivo, 
    bilingue: bilingue, 
    pedagio: pedagio
  })
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

  //console.log('entrou aqui = '+id);

  // parameter post
  const { tipo_veiculo, bandeira, receptivo, bilingue, pedagio } = req.body;
  // update data
  
  await Matriz_tarifaria.update({
    tipo_veiculo: tipo_veiculo,   
    bandeira: bandeira, 
    receptivo: receptivo, 
    bilingue: bilingue, 
    pedagio: pedagio
  },{
    where: { id: id}
  })
  .then( function (data){
    return res.json({success:true, data: data, message:"Matriz_tarifaria atualizado com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.get = async (req, res) => {
  const { id } = 1; //req.params;  

  // Find all projects with a least one task where task.state === project.task
 await Matriz_tarifaria.findAll({ id: id ,
    include: [{
      model: Ocorrencia,
      where: { matrizId: sequelize.col('Matriz_tarifaria.id') }
    }]
  })
  //await Matriz_tarifaria.findByPk({
   // where: { id: id}
    //,
    //include: [ Role ]
  //})
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

module.exports = controllers;
