const express = require('express');
const router = express.Router();

const AdministradorConvidadoController = require('../controllers/AdministradorConvidadoController');

router.get('/list',AdministradorConvidadoController.list);
router.post('/create',AdministradorConvidadoController.create);
router.get('/get/:id', AdministradorConvidadoController.get);
router.put('/update/:id',AdministradorConvidadoController.update);

module.exports = router;
