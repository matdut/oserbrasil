const express = require('express');
const router = express.Router();

const TransladosController = require('../controllers/TransladosController');

router.get('/listporevento/:id',TransladosController.listporevento);
router.post('/create',TransladosController.create);
router.put('/update/:id',TransladosController.update);
router.get('/get/:id', TransladosController.get);
router.delete('/delete/:id',TransladosController.delete);

module.exports = router;
