const express = require('express');
const router = express.Router();

const Matriz_tarifariaController = require('../controllers/Matriz_tarifariaController');

router.get('/list',Matriz_tarifariaController.list);
router.post('/create',Matriz_tarifariaController.create);
router.get('/get/:id', Matriz_tarifariaController.get);
router.put('/update/:id',Matriz_tarifariaController.update);
router.delete('/delete/:id',Matriz_tarifariaController.delete);

//router.get('/find/:id',Matrix_tarifariaController.findMatrizById);

module.exports = router;
