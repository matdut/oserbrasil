const express = require('express');
const router = express.Router();

const Diaria_especialController = require('../controllers/Diaria_especialController');

router.get('/list',Diaria_especialController.list);
router.get('/listbusca',Diaria_especialController.listbusca);
router.post('/create',Diaria_especialController.create);
router.get('/get/:id', Diaria_especialController.get);
router.put('/update/:id',Diaria_especialController.update);
router.delete('/delete/:id',Diaria_especialController.delete);


module.exports = router;
