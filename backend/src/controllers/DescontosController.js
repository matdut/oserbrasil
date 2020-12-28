const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Descontos = require('../model/Descontos');
//var Role = require('../model/Role');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.delete = async (req,res) => {

  const { id } = req.params;  

  await Descontos.destroy({
    where: { id: id }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  })

}

controllers.list = async (req,res) => {
  await Descontos.findAll({
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error.message});
  })
 
}

controllers.create = async (req,res) => {  

  // DATA parametros desde post
  const { qtd_servico_inicial, qtd_servico_final, percentual } = req.body;
  //console.log("ROle es ==>"+role)
  //create
  await Descontos.create({   
    qtd_servico_inicial: qtd_servico_inicial,
    qtd_servico_final: qtd_servico_final,
    percentual: percentual,

  })
  .then( function (data){
    return res.json({success:true, data: data, message:"Estado criado com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error.message});
  })

}

controllers.update = async (req, res) => {
  // parameter id get  
  const { id } = req.params;

  //console.log('entrou aqui = '+id);

  // parameter post
  const {  qtd_servico_inicial, qtd_servico_final, percentual } = req.body;
  // update data
  
  await Descontos.update({
      qtd_servico_inicial: qtd_servico_inicial,
      qtd_servico_final: qtd_servico_final,
      percentual: percentual,
  },{
    where: { id: id}
  })
  .then( function (data){
    return res.json({success:true, data: data, message:"Estado atualizado com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.get = async (req, res) => {
  const { id } = req.params;
  
  await Descontos.findAll({
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

controllers.getNome = async (req, res) => {
  const { id } = req.params;
  await Descontos.findAll({
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
