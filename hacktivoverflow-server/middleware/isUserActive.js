const User = require('../models/user')
const jwt = require('jsonwebtoken')

const isUserActive = function ( req, res, next) {
    jwt.verify( req.headers.authorization, process.env.tokenSecretKey, function(err, decoded){
        console.log('is user active',decoded)
        User
        .findById(decoded.id)
        .then ( response => {
            res.status(200).json({msg:"you got the acces", 
                id:response._id, 
                name:response.name,
                email:response.email
            })
        })
        .catch( err => {
            res.status(400).json({msg:"you don't have acces"})
        })
    })
}
 
module.exports = {
    isUserActive
}