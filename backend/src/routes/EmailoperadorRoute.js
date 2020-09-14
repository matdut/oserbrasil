const express = require('express');
const router = express.Router();

const email_operadorController  = require('../controllers/email_operadorController');

router.get('/list/:id',email_operadorController.list);
router.post('/create',email_operadorController.create);
router.get('/get/:id', email_operadorController.get);
router.get('/getEmpresa/:id/:email', email_operadorController.getEmpresa);
router.get('/getemail/:email', email_operadorController.getemail);
router.put('/update/:id',email_operadorController.update);
router.delete('/delete/:email',email_operadorController.delete);

module.exports = router;
