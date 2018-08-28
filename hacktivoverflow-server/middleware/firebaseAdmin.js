const { gmailSent } = require('./gmail')
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
        console.log(lowRateQuestion, "this low rate")
        // let mails = {
        //       to : 'adrowicaksono@gmail.com',
        //       subject : 'object2',
        //       text : 'haloo3',
        // }
        // gmailSent(mails)    
}
const getCollections = function(){
    var db = admin.database();
    var ref = db.ref("Questions");
    ref.once("value", function(snapshot) {
      let collections = Object.entries(snapshot.val())
    //   console.log(collections)
    filterZeroAnswer(collections)
    });
}
  

// const getQuestionWithZeroAnswer = getCollections(function(collections){
//     return collections
// })

module.exports = {
    getCollections
}






