const controllers = {}

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// import model and sequelize
var sequelize = require('../model/database');
var HistoricoServicos = require('../model/historico_servicos');
var Eventos = require('../model/Eventos');
var TarifaEspecial = require('../model/Tarifa_especial');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.delete = async (req,res) => {
  
  // parameter post  
  const { id } = req.params;  
 // console.log( JSON.stringify(req.params, null, "    ") ); 

  //console.log('delete id  - '+id);
  // delete sequelize
  await HistoricoServicos.destroy({
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

controllers.deleteevento = async (req,res) => {
  
  // parameter post  
  const { eventoid } = req.params;  
 // console.log( JSON.stringify(req.params, null, "    ") ); 

  //console.log('delete id  - '+id);
  // delete sequelize
  await HistoricoServicos.destroy({
    where: { eventoId: eventoid }
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

controllers.get = async (req, res) => {
  const { id } = req.params;
  
  await HistoricoServicos.findAll({    
    where: { id: id} 
  })
  .then( function(data){
    return res.json({success:true, data:data});
  })
  .catch(error => {
     return res.json({success:false});
  })
  
}


controllers.listporevento = async (req,res) => {
  const { id } = req.params;
  
  await HistoricoServicos.findAll({
    where: { eventoId: id  }  
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
}

controllers.listaeventosservicos = async (req,res) => {
  const { eventoid, id, perfilId } = req.params;
  
  await HistoricoServicos.findAll({
    include: [
      { 
       model: Eventos,
           where: { 
             id: eventoid, logid: id, perfilId: perfilId
           },         
      }],
    where: { eventoId: eventoid,  logid: id, perfilId: perfilId },  
    order: [
      ['createdAt', 'DESC']
    ]  
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
}

controllers.listaservicos = async (req,res) => {
  const { eventoid, id, perfilId } = req.params;
  
  await HistoricoServicos.findAll({
    where: { 
      eventoId: eventoid,  logid: id, perfilId: perfilId,
   /*   servico_pai_id: {
        [Op.In]: [null,0]             
      } */
    },  
    order: [
      ['createdAt', 'DESC']
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
  const { tipoEventoId, eventoId, nome_passageiro, telefone_passageiro, quantidade_passageiro, data_servico,
    hora_inicial, hora_final, local_embarque, local_desembarque, motorista_bilingue, 
    motorista_receptivo, nome_motorista, telefone_motorista, quantidade_diarias,
    km_translado, tempo_translado, valor_estimado, valor_oser, valor_motorista, situacao, motivo_cancelamento, 
    logid, perfilId, tipoTransporte, embarque_latitude, embarque_logitude, desembarque_latitude, desembarque_longitude,
    valor_bilingue, valor_receptivo, companhia_aerea, numero_voo, motorista_alocado, cartaoId, statusId, distancia_value, tempo_value, servico_pai_id } = req.body;
  //console.log("ROle es ==>"+role)

  //console.log(req.body);      

  //create
  await HistoricoServicos.create({       
    tipoEventoId: tipoEventoId,
    tipoTransporte: tipoTransporte,
    nome_passageiro: nome_passageiro, 
    telefone_passageiro: telefone_passageiro,
    quantidade_passageiro: quantidade_passageiro, 
    data_servico: data_servico,   
    hora_inicial: hora_inicial,  
    hora_final: hora_final,
    companhia_aerea: companhia_aerea,
    numero_voo: numero_voo,
    motorista_alocado: motorista_alocado, 
    quantidade_diarias: quantidade_diarias,
    local_embarque: local_embarque, 
    local_desembarque: local_desembarque, 
    embarque_latitude: embarque_latitude, 
    embarque_logitude: embarque_logitude, 
    valor_bilingue: valor_bilingue, 
    valor_receptivo: valor_receptivo,
    desembarque_latitude: desembarque_latitude, 
    desembarque_longitude: desembarque_longitude, 
    motorista_bilingue: motorista_bilingue, 
    motorista_receptivo: motorista_receptivo, 
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
    logid: logid,
    distancia_value: distancia_value, 
    tempo_value: tempo_value,
    perfilId: perfilId,    
    cartaoId: cartaoId,
    servico_pai_id: servico_pai_id,
    statusId: statusId 
  })
  .then( function (data){
    return res.json({success:true, data: data, message:"Translados criado com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.update = async (req, res) => {
  // parameter id get  
  const { tipoEventoId, eventoId, nome_passageiro, telefone_passageiro, quantidade_passageiro, data_servico,
    hora_inicial, hora_final, local_embarque, local_desembarque, motorista_bilingue, 
    motorista_receptivo, nome_motorista, telefone_motorista, quantidade_diarias,
    km_translado, tempo_translado, valor_estimado, valor_oser, valor_motorista, situacao, 
    motivo_cancelamento, logid, perfilId, tipoTransporte, embarque_latitude, embarque_logitude, 
    desembarque_latitude, desembarque_longitude, companhia_aerea, numero_voo, motorista_alocado, cartaoId, statusId,
    valor_bilingue, valor_receptivo, distancia_value, tempo_value, servico_pai_id} = req.body;

  console.log('entrou aqui = '+data_servico);

  // parameter post
    const { id } = req.params;
  // update data
  
  await HistoricoServicos.update({
    tipoEventoId: tipoEventoId,
    tipoTransporte: tipoTransporte,
    nome_passageiro: nome_passageiro, 
    telefone_passageiro: telefone_passageiro,
    quantidade_passageiro: quantidade_passageiro, 
    quantidade_diarias: quantidade_diarias,
    data_servico: data_servico,  
    hora_inicial: hora_inicial,
    hora_final: hora_final,  
    valor_bilingue: valor_bilingue, 
    valor_receptivo: valor_receptivo,
    motorista_alocado: motorista_alocado, 
    companhia_aerea: companhia_aerea,
    numero_voo: numero_voo, 
    local_embarque: local_embarque, 
    local_desembarque: local_desembarque, 
    embarque_latitude: embarque_latitude, 
    embarque_logitude: embarque_logitude, 
    desembarque_latitude: desembarque_latitude, 
    desembarque_longitude: desembarque_longitude, 
    motorista_bilingue: motorista_bilingue, 
    motorista_receptivo: motorista_receptivo, 
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
    logid: logid,
    perfilId: perfilId,    
    cartaoId: cartaoId,
    distancia_value: distancia_value, 
    tempo_value: tempo_value,
    servico_pai_id: servico_pai_id,
    statusId: statusId
  },{
    where: { id: id}
  })
  .then( function (data){
    return res.json({success:true, data: data, message:"Translados atualizado com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}


module.exports = controllers;
