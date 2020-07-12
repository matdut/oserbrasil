const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const Post = require("../model/Post");
const fs = require("fs");

router.get("/posts/:id", async (req, res) => {
  const id = req.params.id; 

  const posts = await Post.findAll({  
    where: { userId: id }
  }).then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

});
  

router.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
    //const { originalname: name, size, key, location: url = "" } = req.file;
// Var imageURL = 'data:image/png;base64,' + new Buffer(res.data.data.profile_pic, 'binary').toString('base64')
    const { originalname: name, size, filename: key, location: url} = req.file;
    //const { originalname: name, size, key, url } = req.file;

    const post = await Post.create({
      name,
      size,
      key,
      url,
      data: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + key)
    });
  
    return res.json(post);
});

  
router.delete("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

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