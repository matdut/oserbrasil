const express = require('express');
const router = express.Router();

const MensagensMotoristaController = require('../controllers/MensagensMotoristaController');

router.get('/list',MensagensMotoristaController.list);
router.post('/create',MensagensMotoristaController.create);
router.get('/get/:id', MensagensMotoristaController.get);
router.put('/update/:id',MensagensMotoristaController.update);
router.delete('/delete/:id',MensagensMotoristaController.delete);

module.exports = router;
