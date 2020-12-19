const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
//const upload = multer({ dest: 'uploads/' });

const MotoristaPreferidoController = require('../controllers/MotoristaPreferidoController');

router.get('/list',MotoristaPreferidoController.list);
router.post('/create', MotoristaPreferidoController.create);
router.get('/get/:id', MotoristaPreferidoController.get);
router.put('/update/:id', MotoristaPreferidoController.update);
router.delete('/delete/:id',MotoristaPreferidoController.delete);


module.exports = router;
