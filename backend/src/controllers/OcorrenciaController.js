const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Ocorrencia = require('../model/Ocorrencia');
//var Role = require('../model/Role');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.list = async (req,res) => {
  await Ocorrencia.findAll({
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
  const { faixa_inicial, faixa_final, valor_KM, valor_tempo, matrizId } = req.body;
  //console.log("ROle es ==>"+role)
  //create
  await Ocorrencia.create({   
    faixa_inicial: faixa_inicial, 
    faixa_final: faixa_final, 
    valor_KM: valor_KM, 
    valor_tempo: valor_tempo,
    matrizId: matrizId
  })
  .then( function (data){
    return res.json({success:true, data: data, message:"Ocorrencia criado com sucesso"});
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
  const { faixa_inicial, faixa_final, valor_KM, valor_tempo } = req.body;
  // update data
  
  await Ocorrencia.update({
    faixa_inicial: faixa_inicial, 
    faixa_final: faixa_final, 
    valor_KM: valor_KM, 
    valor_tempo: valor_tempo
  },{
    where: { id: id}
  })
  .then( function (data){
    return res.json({success:true, data: data, message:"Ocorrencia atualizado com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.get = async (req, res) => {
  const { id } = req.params;
  await Ocorrencia.findAll({
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
