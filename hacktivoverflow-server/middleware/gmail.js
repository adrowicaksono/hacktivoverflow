console.log('sending test email')

 
var send = require('gmail-send')({
  user: 'adrowicaks@gmail.com',
  pass: '',
  to:   'adrowicaksono@gmail.com',
  // bcc: 'some-user@mail.com',            // almost any option of `nodemailer` will be passed to it
  subject: 'test subject',
  text:    'gmail-send example 1',
  html:    '<b>html text</b>'
});

// send()
