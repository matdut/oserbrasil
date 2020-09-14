const express = require('express');
const router = express.Router();

const ServicosController = require('../controllers/ServicosController');

router.get('/listporevento/:id',ServicosController.listporevento);
router.post('/create',ServicosController.create);
router.put('/update/:id',ServicosController.update);
router.get('/get/:id', ServicosController.get);
router.delete('/delete/:id',ServicosController.delete);

module.exports = router;
