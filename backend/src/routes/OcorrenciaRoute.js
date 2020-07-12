const express = require('express');
const router = express.Router();

const OcorrenciaController = require('../controllers/OcorrenciaController');

router.get('/list',OcorrenciaController.list);
router.post('/create',OcorrenciaController.create);
router.get('/get/:id', OcorrenciaController.get);
router.put('/update/:id',OcorrenciaController.update);

module.exports = router;
