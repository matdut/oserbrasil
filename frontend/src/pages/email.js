//import React from 'react';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    //host: "smtps.uol.com.br",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        //user: "mateus.dutra@oserbrasil.com.br",
        user: "mateusdutra481@gmail.com",
        pass: "uvlb4otd"
    },
    tls: { rejectUnauthorized: false }
});
  
  const mailOptions = {
   // from: "mateus.dutra@oserbrasil.com.br",
    from: "mateusdutra481@gmail.com",
    to: "mateusdutra481@gmail.com",
    subject: "E-mail enviado usando Node!",
    text: "Bem vindo matesu sadsa das ao Oser, sua senha é 12345. "
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log('erro de envio - '+error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
  /*

  from: 'matesudutra481@gmail.com',
              to: 'matesudutra481@gmail.com',
              subject: 'E-mail enviado usando Node!',
              text: 'Bem vindo '+ response.data.data.nome +' ao Oser, sua senha é '+response.data.data.senha+'. ',
              html: "<b>Hello world?</b>", // html body


   const nodemailer = require('nodemailer');

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "mateusdutra481@gmail.com",
                    pass: "uvlb4otd"
                },
                tls: { rejectUnauthorized: false }
              });
              
            const mailOptions = {
              from: 'matesudutra481@gmail.com',
              to: response.data.data.email,
              subject: 'E-mail enviado para seu email',
              text: 'Seu email de acesso '+response.data.data.email+' sua senha '+ response.data.data.senha
            };

            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                  console.log('erro de envio'+error);
              } else {
                  console.log('Email enviado');
              }
            });
  */