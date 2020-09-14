const express = require('express');
const router = express.Router();

const TipoEventoController = require('../controllers/TipoEventoController');

router.get('/list',TipoEventoController.list);
router.post('/create',TipoEventoController.create);
router.get('/get/:id', TipoEventoController.get);
router.put('/update/:id',TipoEventoController.update);
router.delete('/delete/:id',TipoEventoController.delete);

module.exports = router;
