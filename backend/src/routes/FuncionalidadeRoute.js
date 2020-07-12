const express = require('express');
const router = express.Router();

const FuncionalidadeController = require('../controllers/FuncionalidadeController');

router.get('/list',FuncionalidadeController.list);
router.post('/create',FuncionalidadeController.create);
router.get('/get/:id', FuncionalidadeController.get);
router.put('/update/:id',FuncionalidadeController.update);

module.exports = router;
