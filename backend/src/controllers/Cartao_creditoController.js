const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Cartao = require('../model/Cartao_credito');
//var Role = require('../model/Role');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.list = async (req,res) => {
  await Cartao.findAll()
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

controllers.get = async (req, res) => {
  const { id } = req.params;
  await Cartao.findAll({
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

controllers.getListaporCliente = async (req, res) => {
  
  const clienteId = req.params.ClienteId;    

  await Cartao.findAll({
      where: { clienteId: clienteId }    
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
  const { numero, nome, data_vencimento, codigo_seguranca, cpf, clienteId } = req.body;
  //console.log("ROle es ==>"+role)
  //create
  //console.log('entrou aqui clienteId = '+clienteId);
  await Cartao.create({
    numero: numero,              
    nome: nome,              
    data_vencimento: data_vencimento,
    codigo_seguranca: codigo_seguranca,
    cpf: cpf,
    clienteId: clienteId
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
  //console.log('entrou aqui = '+id);

  // parameter post
  const { numero, nome, data_vencimento, ccodigo_seguranca, cpf, clienteId } = req.body;
  // update data
  
  await Cartao.update({
    numero: numero,              
    nome: nome,              
    data_vencimento: data_vencimento,
    ccodigo_seguranca: ccodigo_seguranca,
    cpf: cpf
  },{
    where: { id: id, clienteId: clienteId }
  })
  .then( function (data){
    return res.json({success:true, data: data, message:"Banco atualizado com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

module.exports = controllers;
