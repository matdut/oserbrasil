const express = require('express');
const router = express.Router();

const StatusController = require('../controllers/StatusController');

router.get('/list',StatusController.list);
router.get('/listafiltro',StatusController.listafiltro);
router.post('/create',StatusController.create);
router.get('/get/:id', StatusController.get);
router.put('/update/:id',StatusController.update);

module.exports = router;
