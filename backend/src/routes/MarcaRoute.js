const express = require('express');
const router = express.Router();

const MarcaController = require('../controllers/MarcaController');

router.get('/list',MarcaController.list);
router.post('/create',MarcaController.create);
router.get('/get/:id', MarcaController.get);
router.put('/update/:id',MarcaController.update);

module.exports = router;
