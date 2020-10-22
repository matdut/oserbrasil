const controllers = {}

// import model and sequelize
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var sequelize = require('../model/database');

var Cliente = require('../model/Cliente');
var Status = require('../model/Status');
var Situacao = require('../model/Situacao');
var Perfil = require('../model/Perfil');
//var Evento = require('../model/Eventos');
//var Role = require('../model/Role');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.delete = async (req,res) => {

  const { id } = req.params;  

  await Cliente.destroy({
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

controllers.update = async (req, res) => {
  // parameter id get  
  const { id } = req.params;

  console.log('entrou aqui = '+id); 

  // parameter post
  const { nome, email, senha, endereco, numero, complemento, telefone1,
    telefone2, celular, cidade, bairro, estadoId, cep, tipo_cliente, inscricao_municipal, statusId,
    cpf, data_nascimento, contato, cnpj, inscricao_estadual, razao_social, nome_fantasia, situacaoId, perfilId} = req.body;
  // update data
  
  console.log('data_nascimento = '+data_nascimento);
  
  await Cliente.update({
            nome: nome,              
            email: email,
            senha: senha,
            endereco: endereco,
            numero: numero,
            complemento: complemento,
            telefone1: telefone1,
            telefone2: telefone2,
            celular: celular,
            cidade: cidade,
            bairro: bairro,
            estadoId: estadoId,
            cep: cep,
            tipo_cliente: tipo_cliente,
            cpf: cpf,
            data_nascimento: data_nascimento,
            contato: contato,
            cnpj: cnpj,
            razao_social: razao_social,
            inscricao_estadual: inscricao_estadual,
            inscricao_municipal: inscricao_municipal,
            nome_fantasia: nome_fantasia,
            perfilId: perfilId,
            statusId: statusId,
            situacaoId: situacaoId 
  },{
    where: { id: id}
  })
  .then( function (data){
   
      return res.json({success:true, data:data});
   
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

 /* res.status(200).json({
    success:true,
    message:"Cliente atualizado com sucesso",
    data:data
    
  })*/   //res.json({ success:true, data: data, message: "Updated successful"});  

}
controllers.getClienteCpf = async (req, res) => {
 
  //const cpf = req.params.email;  
  const cpf = req.params.cpf;    
  
  await Cliente.findAll({
      where: { cpf: cpf, perfilId: 2 }//. 
      //or: {cpf: email , senha: senha}}   
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

  controllers.findcliente = async (req, res) => { 
    
    const {fcliente, perfil } = req.params;              
    //console.log('cliente - '+ fcliente +'  status '+status+ '  perfilId  '+perfil);
    //const fstatus = req.params.fstatus;            

    await Cliente.findAll({
        include: [{ model: Status  }],
        where: 
        {  
          [Op.or]: 
                  [
                  { nome: {
                        [Op.like]: `%${fcliente}%`             
                      }}, 
                  {
                    cpf: {
                      [Op.like]: `%${fcliente}%`             
                    }
                  },
                  {
                    email: {
                      [Op.like]: `%${fcliente}%`             
                    }
                  }
                ],                
          statusId: {
                  [Op.notIn]: [7]             
                }, 
          perfilId: perfil
      }
      })
      .then( function (data){      
        return res.json({success:true, data:data});
        /* if (data.length > 0) {
          return res.json({success:true, data:data});
         } else {
          return res.json({success:false, data:data});
         }  */       
      })
      .catch(error => {
        return res.json({success:false, message: error});
      })
    
    }    
    controllers.findclientestatus = async (req, res) => { 
    
      const {fcliente, perfil, status } = req.params;              
      //console.log('cliente - '+ fcliente +'  status '+status+ '  perfilId  '+perfil);
      //const fstatus = req.params.fstatus;            
  
      await Cliente.findAll({
          include: [{ model: Status  }],
          where: 
          {  
            [Op.or]: 
                    [
                    { nome: {
                          [Op.like]: `%${fcliente}%`             
                        }}, 
                    {
                      cpf: {
                        [Op.like]: `%${fcliente}%`             
                      }
                    },
                    {
                      email: {
                        [Op.like]: `%${fcliente}%`             
                      }
                    }
                  ],
            perfilId: perfil,
            statusId: status
        }
        })
        .then( function (data){      
          return res.json({success:true, data:data});
          /* if (data.length > 0) {
            return res.json({success:true, data:data});
           } else {
            return res.json({success:false, data:data});
           }  */       
        })
        .catch(error => {
          return res.json({success:false, message: error});
        })
      
      }    

      controllers.findstatus = async (req, res) => { 
    
        const { status, perfil } = req.params;                    
        //const fstatus = req.params.fstatus;            
    
        await Cliente.findAll({
            include: [{ model: Status  }],
            where: 
            {
              perfilId: perfil,
              statusId: status
            }
          })
          .then( function (data){      
            return res.json({success:true, data:data});
            /* if (data.length > 0) {
              return res.json({success:true, data:data});
             } else {
              return res.json({success:false, data:data});
             }  */       
          })
          .catch(error => {
            return res.json({success:false, message: error});
          })
        
        }  
 /*   
    controllers.findcliente = async (req, res) => { 
    
      const {fcliente, perfil, status } = req.params;            

    console.log('cliente - '+ fcliente +'  status '+status+ '  perfilId  '+perfil);
    //const fstatus = req.params.fstatus;            

    await Cliente.findAll({
        include: [{ model: Status  }],
        where: 
        {  
          nome: {
             [Op.like]: `%${fcliente}%`             
          },
          perfilId: perfil,
          statusId: status
      }
      })
      .then( function (data){      
        return res.json({success:true, data:data});
        /* if (data.length > 0) {
          return res.json({success:true, data:data});
         } else {
          return res.json({success:false, data:data});
         }         
      })
      .catch(error => {
        return res.json({success:false, message: error});
      })
    
    }    
*/
  controllers.getClienteCnpj = async (req, res) => {
 
    //const cpf = req.params.email;  
    const cnpj = req.params.cnpj;            

    await Cliente.findAll({
        where: { cnpj: cnpj }//. 
        //or: {cpf: email , senha: senha}}   
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

    controllers.getEmail = async (req, res) => {
      const { email } = req.params;
      await Cliente.findAll({    
        where: { email: email}       
      })
      .then( function(data){
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
  await Cliente.findAll({    
    where: { id: id}
    //,
    //include: [ Role ]
  })
  .then( function(data){
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

controllers.list = async (req,res) => {
  await Cliente.findAll({
     include: [{ model: Status  }],
     where: { 
        statusId: {
          [Op.notIn]: [6,7]             
        },      
       perfilId: 2 
     } 
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
controllers.listarExcluidos = async (req,res) => {
  const status = 2;
  await Cliente.findAll({
    include: [{ model: Status }],   
    where: {       
      perfilId: 2, 
      statusId: 7
    } 
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

controllers.listarIncompletos = async (req,res) => {
  const status = 2;
  await Cliente.findAll({
    include: [{ model: Status }],   
    where: {       
      perfilId: 2, 
      statusId: 6
    } 
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


controllers.listarEmpresarial = async (req,res) => {
  await Cliente.findAll({   
    include: [{ model: Status  }],     
    where: { tipo_cliente: 'J' }
  })
           
  .then( function (data){
    return res.json({success:true, data:data});
    
  })
  .catch(error => {
    return res.json({success:false, message: error});
  }) 
}

controllers.create = async (req,res) => {

  // DATA parametros desde post
  const {nome,              
    email, senha, endereco, numero, complemento, telefone1,
    telefone2, celular, cidade, bairro, estadoId, cep, tipo_cliente, inscricao_municipal, statusId,
    cpf,  data_nascimento, contato, cnpj, inscricao_estadual, razao_social, nome_fantasia, situacaoId, perfilId } = req.body;
  //console.log("ROle es ==>"+role)
  //create  
  await Cliente.create({
    nome: nome,              
    email: email,
    senha: senha,
    endereco: endereco,
    numero: numero,
    complemento: complemento,
    telefone1: telefone1,
    telefone2: telefone2,
    celular: celular,
    cidade: cidade,
    bairro: bairro,
    estadoId: estadoId,
    cep: cep,
    tipo_cliente: tipo_cliente,
    cpf: cpf,
    data_nascimento: data_nascimento,
    contato: contato,
    cnpj: cnpj,
    razao_social: razao_social,
    inscricao_estadual: inscricao_estadual,
    inscricao_municipal: inscricao_municipal,
    nome_fantasia: nome_fantasia,
    perfilId: perfilId,
    statusId: statusId,
    situacaoId: situacaoId 
  })
  .then( function (data){      
    
       return res.json({success:true, data:data});
   
  })
  .catch(error => {
    return res.json({success:false, error: error});
  })
}

module.exports = controllers;
