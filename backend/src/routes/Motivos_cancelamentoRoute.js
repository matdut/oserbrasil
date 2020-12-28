const express = require('express');
const router = express.Router();

const MotivosCancelamentoController = require('../controllers/MotivosCancelamentoController');

router.get('/list',MotivosCancelamentoController.list);
router.post('/create',MotivosCancelamentoController.create);
router.get('/get/:id', MotivosCancelamentoController.get);
router.put('/update/:id',MotivosCancelamentoController.update);
router.delete('/delete/:id',MotivosCancelamentoController.delete);

module.exports = router;
