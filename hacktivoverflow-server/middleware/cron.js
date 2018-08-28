const CronJob = require('cron').CronJob;


const kue = require('kue')
    , queue = kue.createQueue()

const { getCollections }  = require('./firebaseAdmin')

const test = function () {
    new CronJob('*/20 * * * * *', function () {
     getCollections()
    }, null, true, 'Asia/Jakarta')
}

module.exports = {
    test
}