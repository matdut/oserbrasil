const express = require('express');
const router = express.Router();

const PerfilController = require('../controllers/PerfilController');

router.get('/list',PerfilController.list);
router.post('/create',PerfilController.create);
router.get('/get/:id', PerfilController.get);
router.put('/update/:id',PerfilController.update);

module.exports = router;
