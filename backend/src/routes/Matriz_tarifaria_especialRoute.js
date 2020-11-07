const express = require('express');
const router = express.Router();

const Matriz_tarifaria_especialController = require('../controllers/Matriz_tarifaria_especialController');

router.get('/list',Matriz_tarifaria_especialController.list);
router.get('/listbusca',Matriz_tarifaria_especialController.listbusca);
router.post('/create',Matriz_tarifaria_especialController.create);
router.get('/get/:id', Matriz_tarifaria_especialController.get);
router.put('/update/:id',Matriz_tarifaria_especialController.update);
router.delete('/delete/:id',Matriz_tarifaria_especialController.delete);
//router.get('/find/:id',Matrix_tarifariaController.findMatrizById);

module.exports = router;
