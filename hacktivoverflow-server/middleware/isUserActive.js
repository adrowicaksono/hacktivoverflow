const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const isUserActive = function (req, res, next){
    jwt.verify(req.headers.token, process.env.tokenSecretKey, function (err, decoded){
        if(err) res.status(400).json({message:'your token is not valid'})
        console.log('from user active has checked : ', decoded)
        findById(decoded.id)
        .then ( response => {
            if ( response ){
                res.status(200).json({message:'user is active', data:response})
            }else {
                res.status(401).json({message: 'user is not unregistered'})
            }
        })
        .catch ( err => {
            res.status(401).json({message : 'user is not unregistered'})
        } )
    })
}

module.exports = {
    isUserActive
}

