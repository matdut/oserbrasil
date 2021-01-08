const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
//const upload = multer({ dest: 'uploads/' });

const MotoristaSelecionadosController = require('../controllers/MotoristaSelecionadosController');

router.get('/list',MotoristaSelecionadosController.list);
router.post('/create', MotoristaSelecionadosController.create);
router.get('/get/:id', MotoristaSelecionadosController.get);
router.get('/getChave/:chave', MotoristaSelecionadosController.getChave);
router.put('/update/:id', MotoristaSelecionadosController.update);
router.delete('/delete/:chave_acesso',MotoristaSelecionadosController.delete);


module.exports = router;
