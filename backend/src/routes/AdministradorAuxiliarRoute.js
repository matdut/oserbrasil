const express = require('express');
const router = express.Router();

const AdministradorAuxiliarController = require('../controllers/AdministradorAuxiliarController');

router.get('/list',AdministradorAuxiliarController.list);
router.get('/listExcluidos',AdministradorAuxiliarController.listExcluidos); 
router.get('/listarIncompletos',AdministradorAuxiliarController.listarIncompletos); 
router.post('/create',AdministradorAuxiliarController.create);
router.get('/get/:id', AdministradorAuxiliarController.get);
router.put('/update/:id',AdministradorAuxiliarController.update);

module.exports = router;