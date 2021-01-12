const express = require('express');
const router = express.Router();

const EnvioServicoMotoristaController = require('../controllers/EnvioServicoMotoristaController');

router.get('/list/:motoristaId',EnvioServicoMotoristaController.list);
router.post('/create',EnvioServicoMotoristaController.create);
router.get('/get/:id', EnvioServicoMotoristaController.get);
router.get('/getMotorista/:motorista_id', EnvioServicoMotoristaController.getMotorista);
router.put('/update/:id',EnvioServicoMotoristaController.update);
router.delete('/delete/:id',EnvioServicoMotoristaController.delete);
router.delete('/delete_servico/:servicoId',EnvioServicoMotoristaController.delete_servico);
router.get('/totalEnvioServicoMotorista/:motoristaId', EnvioServicoMotoristaController.totalEnvioServicoMotorista);
module.exports = router;