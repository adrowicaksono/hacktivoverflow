const { gmailSent } = require('./gmail')

const mongoose = require('mongoose')
const User = require ('../models/user')
mongoose.connect(`mongodb://hacktivoverflow-admin123:hacktivoverflow-admin123@ds157901.mlab.com:57901/hacktiv8-over-flow-adrodb`,
    { useNewUrlParser: true }, function(err){
        if(err) console.log(err);
        console.log('we are connected to getEmail')
})

const kue = require('kue')
    , queue = kue.createQueue()


const admin = require('firebase-admin');

const serviceAccount = require('./credential/hacktivoverflow-admin.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hacktivoverflow-4332b.firebaseio.com"
  });

const filterZeroAnswer = function (collections){
    console.log("hai")
    
        let lowRateQuestion = []

        collections.forEach(e => {   
            let data = e[1]
            if(data.hasOwnProperty("Comments")){
                let answer = Object.entries(data.Comments)
                if (answer.length < 0){
                    lowRateQuestion.push(e)
                }
            }else {
                lowRateQuestion.push(e)
            }
        })
        
        let countOfQuestion = lowRateQuestion.length
        
        User
        .find()
        .then( response => {
            response.forEach( el => {
                let randomIdx = Math.floor(Math.random()*countOfQuestion)
                console.log("=======================================")
                console.log(lowRateQuestion[randomIdx], "this low rate")
                console.log(el)
                console.log("=======================================")
                let sentQuestion = queue.create('sent', {
                    title : "sent low rate question",
                    question : lowRateQuestion[randomIdx],
                    to : el
                })
                sentQuestion.priority('medium').save() 

                })
        })
        .catch( err => {
            console.log("from get email :", err)
        })
           
}
const getCollections = function(){
    var db = admin.database();
    var ref = db.ref("Questions");
    ref.once("value", function(snapshot) {
      let collections = Object.entries(snapshot.val())
    filterZeroAnswer(collections)
    });
}
  
// getCollections()


module.exports = {
    getCollections
}






