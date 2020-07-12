const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
//var Banco = require('../model/Banco');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.list = async (req,res) => {

  fetch("https://www.receitaws.com.br/v1/cnpj/27865757000102")
  .then((data)=>{
     return res.json({success:true, data: data});
  })  
  .catch(error => {
     return res.json({success:false, message: error});
  })
  
}

module.exports = controllers;
