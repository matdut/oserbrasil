const express = require('express');
const router = express.Router();

const FuncionalidadeController = require('../controllers/FuncionalidadeController');

router.get('/list',FuncionalidadeController.list);
router.post('/create',FuncionalidadeController.create);
router.get('/get/:perfilId/:descricao', FuncionalidadeController.get);
router.put('/update/:id',FuncionalidadeController.update);
router.delete('/delete/:id/:perfilId',FuncionalidadeController.delete);
router.get('/get/:perfilId', FuncionalidadeController.getPerfil);

module.exports = router;
