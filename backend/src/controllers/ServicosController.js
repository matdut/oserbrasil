const controllers = {}

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// import model and sequelize
var sequelize = require('../model/database');
var Servicos = require('../model/servicos');
var Eventos = require('../model/Eventos');
var TarifaEspecial = require('../model/Tarifa_especial');
var Motorista = require('../model/Motorista');

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

}

controllers.deleteevento = async (req,res) => {
  
  const { eventoid } = req.params;  
 
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

controllers.getServicoMotorista = async (req, res) => {
  const { servicoId } = req.params;

  await Servicos.findAll({  
    include: [{
     model: Motorista,
    //  where: { id: '45' }
     }],    
    where: { 
      id: servicoId
    } 
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
    //group: ['createdAt', 'DESC'],
    order:[ 
      ['createdAt',  'ASC']      
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
    order: [ 
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

controllers.busca_ultimo_filho = async (req,res) => {
  const { eventoid, id, perfilId } = req.params;

  console.log('entrou aqui busca_ultimo_filho = '+id+ ' eventoid '+ eventoid);  
  
  await Servicos.findAll({
    where: { 
      servico_pai_id: eventoid,  logid: id, perfilId: perfilId,     
    }, 
    order: [ 
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

controllers.teste_max = async (req,res) => {

  const { eventoid, id, perfilId } = req.params;

   await Servicos.findAll({
    attributes: [
      sequelize.fn('MAX', sequelize.col('data_servico'))
    ],
    where: {
       eventoId: eventoid, logid: 41, perfilId: 7  
    }
  }).then( function (data){
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
      },    
      order: [
      //  ['updated_at', 'desc'],      
        ['data_servico', 'asc'],
        ['hora_inicial', 'asc'],
      // X
       
      ],
   // attributes: ['id', 'logo_version', 'logo_content_type', 'name', 'updated_at']  
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
/*  const { tipoEventoId, eventoId, nome_passageiro, telefone_passageiro, quantidade_passageiro, data_servico,
    hora_inicial, hora_final, local_embarque, local_desembarque, motorista_bilingue, 
    motorista_receptivo, nome_motorista, telefone_motorista, quantidade_diarias,
    km_translado, tempo_translado, valor_estimado, valor_oser, valor_motorista, situacao, motivo_cancelamento, 
    logid, perfilId, tipoTransporte, embarque_latitude, embarque_longitude, desembarque_latitude, desembarque_longitude,
    valor_bilingue, valor_receptivo, companhia_aerea, numero_voo, motorista_alocado, cartaoId, statusId, 
    distancia_value, tempo_value, servico_pai_id, motorista_id, estado_selecionado_mapa, valor_pedagio } = req.body; */
  //console.log("ROle es ==>"+role)

  //console.log(req.body);      

  //console.log('criando os filhos - '+JSON.stringify(req.body, null, "    ")); 

  //create
  await Servicos.create( req.body )
 /* await Servicos.create({       
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
    embarque_longitude: embarque_longitude, 
    valor_bilingue: valor_bilingue, 
    valor_receptivo: valor_receptivo,
    desembarque_latitude: desembarque_latitude, 
    desembarque_longitude: desembarque_longitude, 
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
    logid: logid,
    distancia_value: distancia_value, 
    tempo_value: tempo_value,
    perfilId: perfilId,    
    cartaoId: cartaoId,
    servico_pai_id: servico_pai_id,
    statusId: statusId,
    valor_pedagio: valor_pedagio,
    estado_selecionado_mapa: estado_selecionado_mapa 
  })*/
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.update = async (req, res) => {
 
    const { id } = req.params;

  await Servicos.update( req.body,{
    where: { id: id}
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}
controllers.update_filhos = async (req, res) => {  

  const { id } = req.params;
  // parameter id get  
  const { nome_passageiro, telefone_passageiro, quantidade_passageiro, data_servico,
    hora_inicial, hora_final, local_embarque, local_desembarque, motorista_bilingue, 
    motorista_receptivo, nome_motorista, telefone_motorista, quantidade_diarias,
    km_translado, tempo_translado, valor_estimado, valor_oser, valor_motorista, situacao, 
    motivo_cancelamento, embarque_latitude, embarque_longitude, 
    desembarque_latitude, desembarque_longitude, companhia_aerea, numero_voo, motorista_alocado, cartaoId, 
    valor_bilingue, valor_receptivo, motorista_id } = req.body; 
    

  //console.log('entrou aqui = '+id);  
  
  // update data  
  await Servicos.update(
    req.body,{
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

controllers.MaxDataServicoFilho = async (req, res) => {
 
  const { eventoid,  id, perfilId } = req.params;

   console.log('entrou aqui = '+id+ ' eventoid '+ eventoid);  

   

  const salesValue = await Servicos.max('data_servico', {
    where: { servico_pai_id: eventoid, logid: id, perfilId: perfilId, tipoEventoId: 1 }
  });

   return res.json({success:true, data: salesValue});
  
}




module.exports = controllers;
