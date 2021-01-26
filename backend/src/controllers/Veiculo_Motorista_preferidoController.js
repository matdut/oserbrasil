const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var VeiculoMotPref = require('../model/veiculo_motorista_preferido');
var Motorista = require('../model/motorista_preferido');
var Seguradora = require('../model/Seguradora');


// para migrar por si no tiene tablas
sequelize.sync()

controllers.delete = async (req,res) => {
  
  // parameter post  
  const { id } = req.params;  
 
  await VeiculoMotPref.destroy({
    where: { id: id }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  })
   //res.json({success:true, deleted:del, message:"Deleted successful"});

}

controllers.uploadCRVLFiles = async (req, res) => {
  
  console.log('req.file documentoCRVL/update - '+JSON.stringify(req.body, null, "    "));  

 // const { originalname: name, mimetype, size, filename: key, location: url = ""} = req.file;  
 const { foto_url,  name} = req.body;  

  const id = req.params.id;     
  const motoristaId = req.params.motoristaId;     
  //const url2 = req.protocol + '://' + req.get('host')  
  //console.log('entrou aqui = '+id);
  // update data
  
  await VeiculoMotPref.update({   
    foto_CRVL_name: name,
    //foto_CRVL_size: size,
   // foto_CRVL_mimetype: mimetype,
    foto_CRVL_key: foto_url,
    foto_CRVL_url: foto_url
    },{
    where: { id: id,  motoristaId: motoristaId}
    })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.deleteMotorista = async (req,res) => {
  
  // parameter post  
  const { id } = req.params;  
 
  await VeiculoMotPref.destroy({
    where: { motoristaId: id }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  })
   //res.json({success:true, deleted:del, message:"Deleted successful"});

}

controllers.lista_veiculos = async (req,res) => {
  const { id } = req.params;  

  await VeiculoMotPref.findAll({
    where: { motoristaId: id}
   })
   .then( function (data){
     return res.json({success:true, data:data});    
   })
   .catch(error => {
     return res.json({success:false, message: error});
   })
  
 }

controllers.list = async (req,res) => {
  await VeiculoMotPref.findAll({  
   
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
  /*const { marcaId, marca, placa, modeloId, modelo, tipoTransporte, ano, anodut, cor, foto_CRVL_name, foto_CRVL_size, foto_CRVL_key,
    foto_CRVL_mimetype, foto_CRVL_url, motoristaId, apolice, seguradoraId, engate, cadeirinha_pequena, 
    cadeirinha_grande, cadeira_rodas, foto_url } = req.body;*/
  //console.log("Foto url  ==>"+foto_url)
  //create
  await VeiculoMotPref.create(req.body)
  .then( function (data){
    if (data.length > 0) {
      return res.json({success:true, data:data});
     } else {
      return res.json({success:false, data:data});
     }
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.update = async (req, res) => {
  // parameter id get  
  const { id } = req.params;

  // parameter post
  /*const { marcaId, marca, placa, modeloId, modelo, ano, tipoTransporte, anodut, cor, foto_CRVL_name, foto_CRVL_size, foto_CRVL_key,
    foto_CRVL_mimetype, foto_CRVL_url, motoristaId, apolice, seguradoraId, engate, cadeirinha_pequena, 
    cadeirinha_grande, cadeira_rodas, foto_url } = req.body; */
  // update data
  
  await VeiculoMotPref.update(req.body,{
    where: { id: id}
  })
  .then( function (data){
    if (data.length > 0) {
      return res.json({success:true, data:data});
     } else {
      return res.json({success:false, data:data});
     }
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.getVeiculo = async (req, res) => {
  const { id } = req.params;
  
  await VeiculoMotPref.findAll({
    include: [{
      model: Motorista//,         
    //    required: true   
     }],
     where: { id: id }      
  })
  .then( function (data){
    if (data.length > 0) {
      return res.json({success:true, data:data});
     } else {
      return res.json({success:false, data:data});
     }
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

controllers.getVeiculoSelecionado = async (req, res) => {
  const { tipoTransporte, id } = req.params;
  
  await VeiculoMotPref.findAll({   
   //  where: { motoristaId: id, tipoTransporte: tipoTransporte }      
 
   where: { motoristaId: id, tipoTransporte: tipoTransporte }      
  })
  .then( function (data){
    if (data.length > 0) {
      return res.json({success:true, data:data});
     } else {
      return res.json({success:false, data:data});
     }
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

controllers.getVeiculoTransporte = async (req, res) => {
  const { tipoTransporte, id } = req.params;
  
  await VeiculoMotPref.findAll({   
   //  where: { motoristaId: id, tipoTransporte: tipoTransporte }      
   where: { motoristaId: id, tipoTransporte: tipoTransporte }      
  })
  .then( function (data){
    if (data.length > 0) {
      return res.json({success:true, data:data});
     } else {
      return res.json({success:false, data:data});
     }
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

controllers.getMotoristaVeiculos = async (req, res) => {
  const { id } = req.params;
  
  await VeiculoMotPref.findAll({
    where: { motoristaId: id}  
  })
  .then( function (data){
    if (data.length > 0) {
      return res.json({success:true, data:data});
     } else {
      return res.json({success:false, data:data});
     }
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

controllers.get = async (req, res) => {
  const { id } = req.params;
  await VeiculoMotPref.findAll({    
    where: { id: id}  
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

module.exports = controllers;
