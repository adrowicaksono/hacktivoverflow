const kue = require('kue')
    , queue = kue.createQueue()

const { gmailSent } = require('./gmail')

queue.process('sent', function(job, done){
    console.log(job.data.title)
    let question = job.data.question[1]
    // console.log(job.data.to)
    let mails = {
          to : job.data.to.email,
          subject : 'hacktivoverflow - lets answer',
          text : `apakah kamu mau membantu ${question.name}, dia menanyakan :`,
          html : question.content
    }
    console.log("mail obj :",mails)
    gmailSent(mails) 
    done()
})

kue.app.listen(3001)