const express = require('express');
const router = express.Router();

const OperadorController = require('../controllers/OperadorController');

router.get('/list',OperadorController.list);
router.post('/create',OperadorController.create);
router.get('/get/:id', OperadorController.get);

module.exports = router;
