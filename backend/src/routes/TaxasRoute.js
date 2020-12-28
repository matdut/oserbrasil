const express = require('express');
const router = express.Router();

const TaxasController = require('../controllers/TaxasController');

router.get('/list',TaxasController.list);
router.post('/create',TaxasController.create);
router.get('/get/:id', TaxasController.get);
router.put('/update/:id',TaxasController.update);
router.delete('/delete/:id',TaxasController.delete);

module.exports = router;
