const express = require('express');
const router = express.Router();

const BancoController = require('../controllers/BancoController');

router.get('/list',BancoController.list);
router.post('/create',BancoController.create);
router.get('/get/:id', BancoController.get);
router.put('/update/:id',BancoController.update);

module.exports = router;
