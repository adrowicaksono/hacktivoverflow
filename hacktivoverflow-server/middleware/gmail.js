console.log('gmail is active')

function gmailSent (obj) {
  const send = require('gmail-send')({
    user: 'adrowicaks@gmail.com',
    pass: 'xobvemyetbdgbkwp',
    to:   obj.to,
    // bcc: 'some-user@mail.com',            // almost any option of `nodemailer` will be passed to it
    subject: obj.subject,
    text:    obj.text,
    html:    obj.html
  })
  send()
}
// let mails = {
//   to : 'adrowicaksono@gmail.com',
//   subject : 'object',
//   text : 'haloo',
// }
// gmailSent(mails)


module.exports = {
  gmailSent
}