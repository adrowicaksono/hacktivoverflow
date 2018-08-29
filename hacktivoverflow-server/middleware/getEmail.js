const mongoose = require('mongoose')

mongoose.connect(`mongodb://hacktivoverflow-admin123:hacktivoverflow-admin123@ds157901.mlab.com:57901/hacktiv8-over-flow-adrodb`,
    { useNewUrlParser: true }, function(err){
        if(err) console.log(err);
        console.log('we are connected to getEmail')
})


const User = require ('../models/user')

const getEmail = function () {
   
}


module.exports = {
    getEmail
}

