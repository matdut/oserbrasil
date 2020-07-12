const express = require('express');
const router = express.Router();

const ClienteController = require('../controllers/ClienteController');

router.get('/list',ClienteController.list);
router.post('/create',ClienteController.create);
router.get('/get/:id', ClienteController.get);
router.put('/update/:id',ClienteController.update);
router.delete('/delete/:id',ClienteController.delete);
// router.get('/test',EmployeeController.test );
// router.post('/create',(req,res)=>{
//   res.json({
//     status:"Employeed saved "+JSON.stringify(req.body)
//   });
// })

module.exports = router;
