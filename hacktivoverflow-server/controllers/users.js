const User = require('../models/user')
const jwt = require('jsonwebtoken')

const get = function(req, res){
    jwt.verify(req.headers.token, process.env.tokenSecretKey, function(err, decoded) {
        if(err) res.status(401).json({msg:"is not user"})  

        User
        .find()
        .then(function(user){
            res
            .status(200)
            .json({
                user : user 
            })
        })
        .catch(function(err){
            res
                .status(400)
                .json({
                    msg : err.message
                })
        })

    })

}

const add = function(req,res){
    if(req.body.name == '' || req.body.email == '' || req.body.password == ''){
        res.status(400).json({msg:"data is not valid"})
    } else {
        User
        .create({
            name: req.body.name,
            email: req.body.email,
            password : req.body.password,
        })
        .then(function(user){
            res
            .status(200)
            .json({
                msg : "successfully create user",
                user : user 
            })
        })
        .catch(function(err){
            res
                .status(400)
                .json({
                    msg : err.message
                })
        })
    }
}




module.exports = {
    get,
    add,
}