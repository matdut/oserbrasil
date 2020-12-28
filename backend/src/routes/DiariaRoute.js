const express = require('express');
const router = express.Router();

const DiariaController = require('../controllers/DiariaController');

router.get('/list',DiariaController.list);
router.post('/create',DiariaController.create);
router.get('/get/:id', DiariaController.get);
router.put('/update/:id',DiariaController.update);
router.delete('/delete/:id',DiariaController.delete);



module.exports = router;
