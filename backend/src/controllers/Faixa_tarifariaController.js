const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Faixa = require('../model/Faixas_tarifarias');
//var Role = require('../model/Role');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.delete = async (req,res) => {
  
  // parameter post  
  const { id } = req.params;  
 // console.log( JSON.stringify(req.params, null, "    ") ); 

  //console.log('delete id  - '+id);
  // delete sequelize
  await Faixa.destroy({
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
  await Faixa.findAll({
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
  const { faixa_inicial, faixa_final, valor_km, valor_tempo, matrizId } = req.body;
  //console.log("ROle es ==>"+role)
  //create
  await Faixa.create({   
    faixa_inicial: faixa_inicial, 
    faixa_final: faixa_final, 
    valor_KM: valor_km, 
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
  const { faixa_inicial, faixa_final, valor_km, valor_tempo, matrizId } = req.body;
  // update data
  
  await Faixa.update({
    faixa_inicial: faixa_inicial, 
    faixa_final: faixa_final, 
    valor_km: valor_km, 
    valor_tempo: valor_tempo,
    matrizId: matrizId
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
  await Faixa.findAll({
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
