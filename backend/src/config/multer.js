const multer = require("multer");
const path = require("path");
const crypto = require("crypto");


module.exports = {
  storage: multer.diskStorage({
	// Local onde o arquivo será salvo na máquina do servidor
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),      
        // Gerando o nome da imagem como um hash usando a lib nativa do node: crypto
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);
           console.log('path -'+ path.resolve(__dirname, '..', '..', 'tmp', 'uploads')); 
        return cb(null, res.toString('hex') + path.extname(file.originalname));
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