const CronJob = require('cron').CronJob;


const kue = require('kue')
    , queue = kue.createQueue()


const test = function () {
    new CronJob('*/20 * * * * *', function () {
    const upRate = queue.create('lowRateAnswerBooster run', {
                        title : "low rate booster"
                    }).priority('medium').save()

        upRate.on('complete', function(result){
            console.log('Job completed with data ', result);
            }).on('failed attempt', function(errorMessage, doneAttempts){
            console.log('Job failed attempt', errorMessage);
            }).on('failed', function(errorMessage){
            console.log('Job failed', errorMessage);
            }).on('progress', function(progress, data){
            console.log('\r  job #' + upRate.id + ' ' + progress + '% complete with data ', data );
            });

        console.log(" dari cron job, make kue here")
    }, null, true, 'Asia/Jakarta')
}

module.exports = {
    test
}