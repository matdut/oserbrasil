const express = require('express');
const router = express.Router();

const EnvioServicoMotoristaController = require('../controllers/EnvioServicoMotoristaController');

router.get('/list/:motoristaId/:perfilId',EnvioServicoMotoristaController.list);
router.post('/create',EnvioServicoMotoristaController.create);
router.get('/get/:id', EnvioServicoMotoristaController.get);
router.put('/update/:id',EnvioServicoMotoristaController.update);
router.delete('/delete/:id',EnvioServicoMotoristaController.delete);

module.exports = router;