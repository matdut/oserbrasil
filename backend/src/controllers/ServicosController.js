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

 //console.log('criando os filhos - '+JSON.stringify(req.body, null, "    ")); 

  //create
  await Servicos.create( req.body )
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
