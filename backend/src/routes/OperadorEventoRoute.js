const express = require('express');
const router = express.Router();

const OperadorEventoController = require('../controllers/OperadorEventoController');

router.get('/list',OperadorEventoController.list);
router.post('/create',OperadorEventoController.create);
router.get('/get/:id', OperadorEventoController.get);
router.put('/update/:id', OperadorEventoController.update);
router.delete('/delete/:id',OperadorEventoController.delete);

module.exports = router;
