const controllers = {}

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// import model and sequelize
var sequelize = require('../model/database');
var Servicos = require('../model/servicos');
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
  await Servicos.destroy({
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

controllers.deletePaieFilhos  = async (req,res) => {
  
  // parameter post  
  const { id, perfilId, logid, eventoid, nome_passageiro } = req.params; 
  
  
  await Servicos.destroy({
    where: { 
      eventoId: eventoid, 
      logid: logid, 
      perfilId: perfilId, 
      tipoEventoId: 1,
      nome_passageiro: nome_passageiro, 
      servico_pai_id: {
        [Op.in]: [id, 0],  
      }}
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
  await Servicos.destroy({
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
  
  await Servicos.findAll({    
    where: { id: id} 
  })
  .then( function(data){
    return res.json({success:true, data:data});
  })
  .catch(error => {
     return res.json({success:false});
  })
  
}
controllers.getEvento = async (req, res) => {
  const { eventoid } = req.params;
  console.log('eventoid - '+ eventoid);
  await Servicos.findAll({    
    where: { eventoId: eventoid} 
  })
  .then( function(data){
    if (data.length > 0) {
      return res.json({success:true, data:data});
     } else {
      return res.json({success:false, data:data});
     }
  })
  .catch(error => {
     return res.json({success:false});
  })
  
}

controllers.getEventoPai = async (req, res) => {
  const { paiId, eventoid } = req.params;
  console.log('eventoid - '+ eventoid);
  await Servicos.findAll({    
    where: { id: paiId, eventoId: eventoid, servico_pai_id: 0} 
  })
  .then( function(data){
    if (data.length > 0) {
      return res.json({success:true, data:data});
     } else {
      return res.json({success:false, data:data});
     }
  })
  .catch(error => {
     return res.json({success:false});
  })
  
}
/* 
Se (Data do Serviço for > ou = Data Inicial e Data do Serviço for < ou = Data Final) E
(Hora do Serviço for > ou = Hora Inicial e Hora do Serviço for < ou = Hora Final)

datainicial  >= dataservico and datafinal <= dataservico  
 
    1987-05-01      1990-05-01


          1988-05-01

          select * from `tarifa_especials` 
where '1987-05-01' >= data_inicial and '1987-05-01' <= data_final   

*/
controllers.getbusca = async (req, res) => {
  const { data_servico, hora_inicial, hora_final } = req.params;

 // console.log('data_servico - '+ data_servico);
 await TarifaEspecial.findAll({    
  where: {  
    [Op.and]: 
    [{ 
      data_inicial: {
        [Op.gte]: [data_servico],         
      }
    },
     { 
      data_final: {
        [Op.lte]: [data_servico],                 
      }
    }],        
  },         
}) 
  .then( function(data){
    return res.json({success:true, data:data});
  })
  .catch(error => {
     return res.json({success:false});
  })
  
}
/*controllers.getbusca = async (req, res) => {
  const { data_servico } = req.params;

 // console.log('data_servico - '+ data_servico);
  await TarifaEspecial.findAll({    
    where: {  
      [Op.and]: 
      [{ 
        data_inicial: {
          [Op.gte]: [data_servico],         
        }
      },
       { 
        data_final: {
          [Op.lte]: [data_servico],                 
        }
      }],        
    },         
  }) 
  .then( function(data){
    return res.json({success:true, data:data});
  })
  .catch(error => {
     return res.json({success:false});
  })
  
}
*/
controllers.listporevento = async (req,res) => {
  const { id } = req.params;
  
  await Servicos.findAll({
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
  
  await Servicos.findAll({
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

controllers.busca_filho = async (req,res) => {
  const { eventoid, id, perfilId } = req.params;
  
  await Servicos.findAll({
    where: { 
      servico_pai_id: eventoid,  logid: id, perfilId: perfilId,     
    }, 
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
  
  await Servicos.findAll({
    where: { 
      eventoId: eventoid,  logid: id, perfilId: perfilId,
   /*   servico_pai_id: {
        [Op.In]: [null,0]             
      } a*/
    },  
    order: [
      ['createdAt', 'DESC'],
      ['data_servico', 'ASC'],
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
  await Servicos.create({       
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
  
  await Servicos.update({
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
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}
controllers.updatefilhos = async (req, res) => {  

  const { id } = req.params;
  // parameter id get  
  const { nome_passageiro, telefone_passageiro, quantidade_passageiro, data_servico,
    hora_inicial, hora_final, local_embarque, local_desembarque, motorista_bilingue, 
    motorista_receptivo, nome_motorista, telefone_motorista, quantidade_diarias,
    km_translado, tempo_translado, valor_estimado, valor_oser, valor_motorista, situacao, 
    motivo_cancelamento, embarque_latitude, embarque_logitude, 
    desembarque_latitude, desembarque_longitude, companhia_aerea, numero_voo, motorista_alocado, cartaoId, 
    valor_bilingue, valor_receptivo } = req.body; 
    

  console.log('entrou aqui = '+id);  
  
  // update data  
  await Servicos.update({     
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
    cartaoId: cartaoId,
  },{
    where: { servico_pai_id: id }
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.totalValorServicos = async (req, res) => { 

  const { eventoid,  id, perfilId } = req.params;
 
  const salesValue = await Servicos.sum('valor_estimado', {
    where: { eventoId: eventoid, logid: id, perfilId: perfilId, 
      servico_pai_id: {
        [Op.or]: [null, 0],  
      } }
  });

   return res.json({success:true, data: salesValue});
  
}

controllers.totalViagens = async (req, res) => {
 
  const { eventoid,  id, perfilId } = req.params;

  const salesCount = await Servicos.count({
    where: { eventoId: eventoid, logid: id, perfilId: perfilId }
  });

  return res.json({success:true, data: salesCount});
  
}


controllers.valorServicoTodosEventos = async (req, res) => {
 
  const { id, perfilId } = req.params;

  const salesValue = await Servicos.sum('valor_estimado', {
    where: { logid: id, perfilId: perfilId, 
      servico_pai_id: {
        [Op.or]: [null, 0],            
      } 
    }
  });

   return res.json({success:true, data: salesValue});
  
}


controllers.totalViagensEventos = async (req, res) => {
 
  const { id, perfilId } = req.params;

  const salesCount = await Servicos.count({
    where: { logid: id, perfilId: perfilId      
     }
  });

  return res.json({success:true, data: salesCount});
  
}


controllers.totalViagensADM = async (req, res) => {
 
  // const { eventoid,  id, perfilId } = req.params;
 
   const salesCount = await Servicos.count({ 
     
   });
 
   return res.json({success:true, data: salesCount});
   
 }

 controllers.TotalTodosvalorServicoADM = async (req, res) => {
 
  const { id, perfilId } = req.params;

  const salesValue = await Servicos.sum('valor_estimado', {
    where: {  servico_pai_id: {
                    [Op.or]: [null, 0],        
              } 
            }
  });

   return res.json({success:true, data: salesValue});
  
}

controllers.MaxDataEvento = async (req, res) => {
 
  const { eventoid,  id, perfilId } = req.params;

  const salesValue = await Servicos.max('data_servico', {
    where: { eventoId: eventoid, logid: id, perfilId: perfilId, tipoEventoId: 1 }
  });

   return res.json({success:true, data: salesValue});
  
}




module.exports = controllers;
