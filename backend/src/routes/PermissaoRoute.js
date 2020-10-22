const express = require('express');
const router = express.Router();

const PermissaoController = require('../controllers/PermissaoController');

router.get('/listaperfil/:perfilId',PermissaoController.listPerfil);
router.get('/listaacesso/:perfilId/:id',PermissaoController.lista_acesso);
router.post('/create',PermissaoController.create);
router.get('/get/:logid/:perfilId', PermissaoController.get);
router.get('/getFuncionalidade/:id/:perfilId/:funcId', PermissaoController.getFuncionalidade);
router.put('/update/:id',PermissaoController.update);
router.delete('/delete/:id',PermissaoController.delete);
router.delete('/deletaFuncionalidade/:id/:perfilId/:funcId',PermissaoController.deletaFuncionalidade);

module.exports = router;
