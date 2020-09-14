const express = require('express');
const router = express.Router();

const PermissaoController = require('../controllers/PermissaoController');

router.get('/listaperfil/:perfilId',PermissaoController.listPerfil);
router.post('/create',PermissaoController.create);
router.get('/get/:logid/:perfilId', PermissaoController.get);
router.put('/update/:id',PermissaoController.update);
router.delete('/delete/:id',PermissaoController.delete);

module.exports = router;
