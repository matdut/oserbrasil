const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
//const upload = multer({ dest: 'uploads/' });

const MotoristaSelecionadosController = require('../controllers/MotoristaSelecionadosController');

router.get('/list',MotoristaSelecionadosController.list);
router.post('/create', MotoristaSelecionadosController.create);
router.get('/get/:id', MotoristaSelecionadosController.get);
router.put('/update/:id', MotoristaSelecionadosController.update);
router.delete('/delete/:id',MotoristaSelecionadosController.delete);


module.exports = router;
