const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Eventos = require('../model/Eventos');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.list = async (req,res) => {
  await Eventos.findAll({
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
}

controllers.listaevento = async (req,res) => {
  const { id } = req.params;
  
  await Eventos.findAll({
    where: { clienteId: id  }  
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
  const { cliente_cnpj, cliente_nome, ordem_servico, nome_evento, data_evento, 
         tipoTransporteId, valor_total, cliente_logado_Id } = req.body;
  
  console.log(req.body);          
  //console.log("ROle es ==>"+role)
  //create
  await Eventos.create({   
    cliente_cnpj: cliente_cnpj, 
    cliente_nome: cliente_nome, 
    ordem_servico: ordem_servico, 
    nome_evento: nome_evento, 
    data_evento: data_evento, 
    tipoTransporteId: tipoTransporteId, 
    valor_total: valor_total,
    clienteId: cliente_logado_Id
  })
  .then( function (data){
    return res.json({success:true, data: data});
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
  const { nome } = req.body;
  // update data
  
  await Eventos.update({
            nome: nome
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

controllers.get = async (req, res) => {
  const { id } = req.params;
  await Eventos.findAll({
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
