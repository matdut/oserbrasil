const express = require('express');
const router = express.Router();

const Matrix_tarifariaController = require('../controllers/Matrix_tarifariaController');

router.get('/list',Matrix_tarifariaController.list);
router.post('/create',Matrix_tarifariaController.create);
router.get('/get/:id', Matrix_tarifariaController.get);
router.put('/update/:id',Matrix_tarifariaController.update);
//router.get('/find/:id',Matrix_tarifariaController.findMatrizById);

module.exports = router;
