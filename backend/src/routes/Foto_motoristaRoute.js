const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const path = require("path");

const Foto = require("../model/Foto_motorista");

router.get("/get/:id", async (req, res) => {
 // const id = req.headers.id;  
  //const motoristaid = req.headers.id; 
  const motoristaid = req.params.id;    

    await Foto.findAll({  
      where: { motoristaId: motoristaid }
    })
    .then( function(data){      
      return res.json({success:true, data:data});
    })
    .catch(error => {
       return res.json({success:false});
    })
  
 // return res.json({success:true, data:posts});
  //return res.json(posts);
});

router.put("/update/:id", multer(multerConfig).single('file'), async (req, res) => {
     
  const { originalname: name, size, filename: key, location: url = ""} = req.file;

  //console.log(req.file); 
  
  const motoristaid = req.params.id;     

  const url2 = req.protocol + '://' + req.get('host')  
  //console.log('entrou aqui = '+id);
  // update data
  
  await Foto.update({
    name: name,
    size: size,
    key: key,
    url: url2 + '/tmp/uploads/' + req.file.filename          

    },{
    where: { motoristaid: motoristaid}
    })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

});


router.post("/create", multer(multerConfig).single("file"), async (req, res) => {
 
  const { originalname: name, size, filename: key, location: url = ""} = req.file;
 
  const { motoristaid } = req.body
  const url2 = req.protocol + '://' + req.get('host')  

  //http://localhost:3333/tmp/uploads/7251e3691c5e894ddf971c7766f56455.jpg
  //const { id } = req.motoristaid;
  //const { id } = req.params;
  
  //console.log(JSON.stringify(id, null, "    ")); 
  const post = await Foto.create({
    name: name,
    size: size,
    key: key,
    url: url2 + '/tmp/uploads/' + req.file.filename,        
   
    motoristaId: motoristaid
  }).then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
});
  
router.delete("/motorista/:id", async (req, res) => {
  const post = await Foto.findById(req.params.id);

  await post.remove();

  return res.send();
});

  /*
  routes.delete("/posts/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
  
    await post.remove();
  
    return res.send();
  }); */

module.exports = router;


