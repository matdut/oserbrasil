const express = require('express');
const router = express.Router();

const ModeloController = require('../controllers/ModeloController');

router.get('/list',ModeloController.list);
router.post('/create',ModeloController.create);
router.get('/get/:id', ModeloController.get);
router.get('/getModelo/:id', ModeloController.getModelo);
router.put('/update/:id',ModeloController.update);

module.exports = router;
