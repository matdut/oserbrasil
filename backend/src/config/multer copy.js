const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

//const aws = require("aws-sdk");
//const multerS3 = require("multer-s3");


/*
const storageTypes = {
  local: multer.diskStorage({    
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, file.key);
      });
    }
  })
};

storage: multer.diskStorage({    
    destination: (req, file, cb) => {    
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        
        const filename = `${hash.toString("hex")}-${file.originalname}`;
        //file.key = `${hash.toString("hex")}-${file.originalname}`;        
        //console.log('static -'+ express.static(dest)); 

        console.log('static2 -'+ express.static(file.originalname));
        
        console.log('path -'+ path.resolve(__dirname, "..", "tmp", "uploads")); 
        console.log('filename -'+ filename); 
        //cb(null, file.key);
        cb(null, filename);
      });
    }
  })
*/
//module.exports = {  
module.exports = {
  storage: multer.diskStorage({
    // Local onde o arquivo será salvo na máquina do servidor
      destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
      // Gerando o nome da imagem como um hash usando a lib nativa do node: crypto
      filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, res) => {
          if (err) return cb(err);
          console.log('path -'+ resolve(__dirname, '..', '..', 'tmp', 'uploads')); 
          return cb(null, res.toString('hex') + extname(file.originalname));
        });
      },
    }),  
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/jpeg",
      "image/png",
      "image/gif"
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  }
};