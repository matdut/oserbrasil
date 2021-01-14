const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var EnvioServicoMotorista = require('../model/Envio_servico_motorista');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.list = async (req,res) => {
  const { motoristaId } = req.params;
  await EnvioServicoMotorista.findAll({
    where: { motorista_id: motoristaId },   
    order: [
      ['data_servico', 'ASC']
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

  // DATA parametros desde post
  const { servicoId, tipoEventoId, eventoId, nome_passageiro, telefone_passageiro, quantidade_passageiro, data_servico,
    hora_inicial, local_embarque, motorista_bilingue, 
    motorista_receptivo, nome_motorista, telefone_motorista, quantidade_diarias,
    km_translado, tempo_translado, valor_estimado, valor_oser, valor_motorista, situacao, motivo_cancelamento, 
    perfilId, tipoTransporte, embarque_latitude, embarque_longitude, 
    valor_bilingue, valor_receptivo, motorista_alocado, statusId, 
    distancia_value, tempo_value, servico_pai_id, motorista_id } = req.body;
  
  //console.log("ROle es ==>"+role)
  //create
  await EnvioServicoMotorista.create({ 
    servicoId: servicoId,
    tipoEventoId: tipoEventoId,
    tipoTransporte: tipoTransporte,
    nome_passageiro: nome_passageiro, 
    telefone_passageiro: telefone_passageiro,
    quantidade_passageiro: quantidade_passageiro, 
    data_servico: data_servico,   
    hora_inicial: hora_inicial,        
    motorista_alocado: motorista_alocado, 
    quantidade_diarias: quantidade_diarias,
    local_embarque: local_embarque,    
    embarque_latitude: embarque_latitude, 
    embarque_longitude: embarque_longitude, 
    valor_bilingue: valor_bilingue, 
    valor_receptivo: valor_receptivo,   
    motorista_bilingue: motorista_bilingue, 
    motorista_receptivo: motorista_receptivo, 
    motorista_id: motorista_id,
    nome_motorista: nome_motorista,     
    telefone_motorista: telefone_motorista, 
    km_translado: km_translado, 
    tempo_translado: tempo_translado, 
    valor_estimado: valor_estimado,
    valor_oser: valor_oser,
    valor_motorista: valor_motorista, 
    situacao: situacao, 
    motivo_cancelamento: motivo_cancelamento,
    eventoId: eventoId,    
    distancia_value: distancia_value, 
    tempo_value: tempo_value,
    perfilId: perfilId,   
    servico_pai_id: servico_pai_id,
    statusId: statusId 
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.list_banco_motorista = async (req,res) => {
  const { logid, perfilId } = req.params;

  await EnvioServicoMotorista.findAll({
    where: { logid: logid, perfilId: perfilId  }   
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

  const { servicoId, tipoEventoId, eventoId, nome_passageiro, telefone_passageiro, quantidade_passageiro, data_servico,
    hora_inicial, local_embarque, motorista_bilingue, 
    motorista_receptivo, nome_motorista, telefone_motorista, quantidade_diarias,
    km_translado, tempo_translado, valor_estimado, valor_oser, valor_motorista, situacao, motivo_cancelamento, 
    perfilId, tipoTransporte, embarque_latitude, embarque_longitude, 
    valor_bilingue, valor_receptivo, motorista_alocado, statusId, 
    distancia_value, tempo_value, servico_pai_id, motorista_id } = req.body;
  //console.log('entrou aqui = '+id);
  // parameter post
  // update data
  
  await EnvioServicoMotorista.update({
    servicoId: servicoId, 
    tipoEventoId: tipoEventoId,
    tipoTransporte: tipoTransporte,
    nome_passageiro: nome_passageiro, 
    telefone_passageiro: telefone_passageiro,
    quantidade_passageiro: quantidade_passageiro, 
    data_servico: data_servico,   
    hora_inicial: hora_inicial,        
    motorista_alocado: motorista_alocado, 
    quantidade_diarias: quantidade_diarias,
    local_embarque: local_embarque,    
    embarque_latitude: embarque_latitude, 
    embarque_longitude: embarque_longitude, 
    valor_bilingue: valor_bilingue, 
    valor_receptivo: valor_receptivo,   
    motorista_bilingue: motorista_bilingue, 
    motorista_receptivo: motorista_receptivo, 
    motorista_id: motorista_id,
    nome_motorista: nome_motorista,     
    telefone_motorista: telefone_motorista, 
    km_translado: km_translado, 
    tempo_translado: tempo_translado, 
    valor_estimado: valor_estimado,
    valor_oser: valor_oser,
    valor_motorista: valor_motorista, 
    situacao: situacao, 
    motivo_cancelamento: motivo_cancelamento,
    eventoId: eventoId,    
    distancia_value: distancia_value, 
    tempo_value: tempo_value,
    perfilId: perfilId,   
    servico_pai_id: servico_pai_id,
    statusId: statusId 
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
  await EnvioServicoMotorista.findAll({
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

controllers.getMotorista = async (req, res) => {
  const { motorista_id } = req.params;
  await EnvioServicoMotorista.findAll({
    where: { motorista_id: motorista_id}
    })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}
controllers.delete = async (req,res) => {
  
  // parameter post  
  const { id } = req.params;  
 
  await EnvioServicoMotorista.destroy({
    where: { servicoId: id }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  }) 

}

controllers.delete_servico = async (req,res) => {
  
  // parameter post  
  const { servicoId } = req.params;  
 
  await EnvioServicoMotorista.destroy({
    where: { servicoId: servicoId }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  }) 

}

controllers.delete_servico_motorista = async (req,res) => {
  
  // parameter post  
  const { servicoId, motorista_id } = req.params;  
 
  await EnvioServicoMotorista.destroy({
    where: { servicoId: servicoId, motorista_id: motorista_id }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  }) 

}

controllers.totalEnvioServicoMotorista = async (req, res) => {
 
  const { motoristaId } = req.params;
 
   const salesCount = await EnvioServicoMotorista.count({ 
    where: { 
      motoristaId: motoristaId
     } 
   });
 
   return res.json({success:true, data: salesCount});
   
 }
module.exports = controllers;