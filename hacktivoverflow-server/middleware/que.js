const kue = require('kue')
    , queue = kue.createQueue()

const { getCollections }  = require('./firebaseAdmin')
let count = 1
queue.process('lowRateAnswerBooster', function (job, done){
    console.log('low rate booster ==========', job.title)
    getCollections()
    count++
    done()
})

queue.process('sentQuestion', function(job, done){
    console.log('sent question with email')
    console.log("+============================+")
    done()
})

kue.app.listen(3001)