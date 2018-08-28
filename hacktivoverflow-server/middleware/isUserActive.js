const User = require('../models/user')
const jwt = require('jsonwebtoken')

const isUserActive = function ( req, res, next) {
    jwt.verify( req.headers.authorization, process.env.tokenSecretKey, function(err, decoded){
        console.log('is user active',decoded)
        
    })
}
 
module.exports = {

}