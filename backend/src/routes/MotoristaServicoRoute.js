const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
//const upload = multer({ dest: 'uploads/' });

const MotoristaServicoController = require('../controllers/MotoristaServicoController');

router.get('/list',MotoristaServicoController.list);
router.post('/create', MotoristaServicoController.create);
router.get('/get/:id', MotoristaServicoController.get);
router.put('/update/:id', MotoristaServicoController.update);
router.delete('/delete/:id',MotoristaServicoController.delete);


module.exports = router;
