const express = require('express');
const router = express.Router();

const Tipo_TransporteController = require('../controllers/Tipo_TransporteController');

router.get('/list',Tipo_TransporteController.list);
router.post('/create',Tipo_TransporteController.create);
router.get('/get/:id', Tipo_TransporteController.get);
router.put('/update/:id',Tipo_TransporteController.update);

module.exports = router;
