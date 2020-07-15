const express = require('express');
const router = express.Router();

const Faixa_tarifariaController = require('../controllers/Faixa_tarifariaController');

router.get('/list',Faixa_tarifariaController.list);
router.post('/create',Faixa_tarifariaController.create);
router.get('/get/:id', Faixa_tarifariaController.get);
router.put('/update/:id',Faixa_tarifariaController.update);
router.delete('/delete/:id',Faixa_tarifariaController.delete);

module.exports = router;
