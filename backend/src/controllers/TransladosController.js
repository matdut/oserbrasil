const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Translados = require('../model/Translado_evento');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.listporevento = async (req,res) => {
  const { id } = req.params;
  
  await Translados.findAll({
    where: { eventoId: id  }  
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
  const { eventoId, nome_passageiro, quantidade_passageiro, data_inicial,
    hora_inicial,  local_embarque, local_desembarque, motorista_bilingue, 
    motorista_receptivo, motorista_preferencial, telefone_motorista, 
    km_translado, tempo_translado, valor_estimado, situacao, motivo_cancelamento } = req.body;
  //console.log("ROle es ==>"+role)

  console.log(req.body);      

  //create
  await Translados.create({       
    nome_passageiro: nome_passageiro, 
    quantidade_passageiro: quantidade_passageiro, 
    data_inicial: data_inicial,
    hora_inicial: hora_inicial,  
    local_embarque: local_embarque, 
    local_desembarque: local_desembarque, 
    motorista_bilingue: motorista_bilingue, 
    motorista_receptivo: motorista_receptivo, 
    motorista_preferencial: motorista_preferencial,     
    telefone_motorista: telefone_motorista, 
    km_translado: km_translado, 
    tempo_translado: tempo_translado, 
    valor_estimado: valor_estimado,
    situacao: situacao, 
    motivo_cancelamento: motivo_cancelamento,
    eventoId: eventoId
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
  const { nome_passageiro, quantidade_passageiro, data_inicial,
    hora_inicial,  local_embarque, local_desembarque, motorista_bilingue, 
    motorista_receptivo, motorista_preferencial, telefone_motorista,
    km_translado, tempo_translado, valor_estimado,
    situacao, motivo_cancelamento } = req.body;

  //console.log('entrou aqui = '+id);

  // parameter post
    const { id } = req.params;
  // update data
  
  await Translados.update({
    nome_passageiro: nome_passageiro, 
    quantidade_passageiro: quantidade_passageiro, 
    data_inicial: data_inicial,
    hora_inicial: hora_inicial,  
    local_embarque: local_embarque, 
    local_desembarque: local_desembarque, 
    motorista_bilingue: motorista_bilingue, 
    motorista_receptivo: motorista_receptivo, 
    motorista_preferencial: motorista_preferencial,     
    telefone_motorista: telefone_motorista, 
    km_translado: km_translado, 
    tempo_translado: tempo_translado, 
    valor_estimado: valor_estimado,
    situacao: situacao, 
    motivo_cancelamento: motivo_cancelamento
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
