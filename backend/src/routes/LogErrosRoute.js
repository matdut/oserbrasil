const express = require('express');
const router = express.Router();

const LogErrosController = require('../controllers/LogErrosController');

router.get('/list',LogErrosController.list);
router.post('/create',LogErrosController.create);
router.get('/get/:id', LogErrosController.get);
router.put('/update/:id',LogErrosController.update);
router.delete('/delete/:id',LogErrosController.delete);

module.exports = router;