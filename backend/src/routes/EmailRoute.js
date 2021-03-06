const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const creds = require('../config/config');

var transport = {
    host: "smtp.oser.app.br",    
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "adm@oser.app.br",
        pass: "Jctj1710"
    },
    tls: { rejectUnauthorized: false }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const texto = req.body.texto
  const url = req.body.url

 // const url2 = req.protocol + '://' + req.get('host')  
  //const url = req.protocol + '://' + res.get('host')+'/login' 
 // const url = 'http://www.oser.app.br:21497/login ' 
    
  const content = texto+`\n ${url} `  

  console.log(JSON.stringify(res.body, null, "    ")); 
  var mail = {
    from: 'adm@oser.app.br',
    to: email,  //Change to email address that you want to receive messages on
    subject: 'Oser',
    text: content    
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})



module.exports = router;
