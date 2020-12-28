const express = require('express');
const router = express.Router();

const DescontosController = require('../controllers/DescontosController');

router.get('/list',DescontosController.list);
router.post('/create',DescontosController.create);
router.get('/get/:id', DescontosController.get);
router.get('/getNome/:id', DescontosController.getNome);
router.put('/update/:id',DescontosController.update);
router.delete('/delete/:id',DescontosController.delete);


module.exports = router;
