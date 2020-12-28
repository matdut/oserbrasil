const express = require('express');
const router = express.Router();

const MensagensClienteController = require('../controllers/MensagensClienteController');

router.get('/list',MensagensClienteController.list);
router.post('/create',MensagensClienteController.create);
router.get('/get/:id', MensagensClienteController.get);
router.put('/update/:id',MensagensClienteController.update);
router.delete('/delete/:id',MensagensClienteController.delete);

module.exports = router;
