const express = require('express');
const router = express.Router();

const SeguradoraController = require('../controllers/SeguradoraController');

router.get('/list',SeguradoraController.list);
router.post('/create',SeguradoraController.create);
router.get('/get/:id', SeguradoraController.get);
router.put('/update/:id',SeguradoraController.update);

module.exports = router;
