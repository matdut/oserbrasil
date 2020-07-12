const express = require('express');
const router = express.Router();

const TransladosController = require('../controllers/TransladosController');

router.get('/listporevento/:id',TransladosController.listporevento);
router.post('/create',TransladosController.create);
router.put('/update/:id',TransladosController.update);

module.exports = router;
