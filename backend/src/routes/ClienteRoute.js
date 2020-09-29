const express = require('express');
const router = express.Router();

const ClienteController = require('../controllers/ClienteController');

router.get('/list',ClienteController.list);
router.get('/listarExcluidos', ClienteController.listarExcluidos);
router.post('/create',ClienteController.create);
router.get('/get/:id', ClienteController.get);
router.get('/findstatus/:status/:perfil', ClienteController.findstatus);
router.get('/findcliente/:fcliente/:perfil', ClienteController.findcliente);
router.get('/findclienteStatus/:fcliente/:perfil/:status', ClienteController.findclientestatus);
router.get('/getEmail/:email', ClienteController.getEmail);
router.put('/update/:id',ClienteController.update);
router.delete('/delete/:id',ClienteController.delete);
router.get('/getClienteCpf/:cpf', ClienteController.getClienteCpf);
router.get('/getClienteCnpj/:cnpj', ClienteController.getClienteCnpj);
router.get('/listarEmpresarial', ClienteController.listarEmpresarial);
// router.get('/test',EmployeeController.test );
// router.post('/create',(req,res)=>{
//   res.json({
//     status:"Employeed saved "+JSON.stringify(req.body)
//   });
// })

module.exports = router;
