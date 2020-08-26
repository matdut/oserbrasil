/*
const sendmail = require('sendmail')({
    logger: {
      debug: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error
    },
    silent: false,
    dkim: { // Default: False
      privateKey: fs.readFileSync('./dkim-private.pem', 'utf8'),
      keySelector: 'mydomainkey'
    },
    devPort: false, // Default: False
    devHost: 'localhost', // Default: localhost
    smtpPort: 587, // Default: 25
    smtpHost: 'smtp.oser.app.br' // Default: -1 - extra smtp host after resolveMX
  }) */