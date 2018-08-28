const CronJob = require('cron').CronJob;
const { getCollections }  = require('./firebaseAdmin')

const test = function () {
    new CronJob('*/30 * * * * *', function () {
        getCollections()
        console.log(" dari cron job, make kue here")
    }, null, true, 'Asia/Jakarta')
}

module.exports = {
    test
}