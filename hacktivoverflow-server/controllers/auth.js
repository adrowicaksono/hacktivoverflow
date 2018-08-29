const User = require('../models/user')
const FB = require('fb')
var jwt = require('jsonwebtoken');
require('dotenv').config()
const axios = require('axios')

const login = function(req,res){
    let email = req.body.email
    let password = req.body.password
    console.log("===========================================>", process.env.tokenSecretKey)
    User
    .findOne({
        email : email
    })
    .then(function(user){
        if(user){
            let hash = user.password
            user
            .comparePassword(password, function(err, isMatch){  
                if(isMatch){
                    var token = jwt.sign({ id:user.id, name:user.name, email:user.email }, process.env.tokenSecretKey);
                    console.log("dari server token :", token )
                    res
                        .status(200)
                        .json({
                            msg : "login successfully",
                            token : token,
                            userId : user.id
                        })
                    }else{
                        res
                            .status(400)
                            .json({
                                msg : "wrong password"
                            })
                    }

            })
        }else{
            res
                .status(400)
                .json({
                    msg:"email unregister"
                })
        }
    })
    .catch(function(err){
        res
        .status(400)
        .json({
            msg : "your token is not valid"
        })
    })
    console.log(email, password, "login")
}

loginFacebook = function(req,res){
    let tokenFb = req.body.accessToken
    console.log("<=======================================",tokenFb)
    FB.api('me', {fields:['id', 'name', 'email'], 
            access_token:tokenFb},
            function(resFb){
                console.log(resFb.email)
                let email = resFb.email
                User
                .findOne({email:email})
                .then(function(user){
                    console.log(user)
                    if(user){
                        console.log("ada user nya", user)
                        var token = jwt.sign({ id:user.id, name:user.name, email:user.email }, process.env.tokenSecretKey);
        
                        console.log("dari server token (ada user):", token )
                        res
                            .status(200)
                            .json(token) 
                    }else{
                        let name = resFb.name.split(' ')
                        let password = name[0]+'hacktiv8'
                        console.log("password====>", password)
                        User
                        .create({
                            name:resFb.name,
                            email:resFb.email,
                            password:password,
                        })
                        .then(function(user){
                            var token = jwt.sign({ id:user.id, name:user.name, email:user.email }, process.env.tokenSecretKey);
                            console.log("dari server token (user baru):", token )
                            res
                                .status(200)
                                .json({
                                    token:token,
                                    userId :user.id
                                })
                        })
                        .catch(function(err){
                            res
                               .status(400)
                               .json(err)
                        })
                    }
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
// https://www.googleapis.com/oauth2/v3/userinfo?access_token=ya29.GlsIBiTEbTiYGMbAfu7ndVB5dyoYGddYRz-xKPZ6_Q3KFx4LP529BK2oDrEh6t_V5fHlcZr5FbZNbqwxC01D1Ie4PH-rgrVNtggR_2AhjaExXnogEv0vPo2DOROO
const loginGoogle = function (req, res) {
    console.log(req.body.accessToken)
    let url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${req.body.accessToken}`
    axios.get(url)
    .then(response => {
        console.log(response.data)
        User
        .findOne({email:response.data.email})
        .then(function(user){
            if(user){
                console.log("ada user nya", user)
                var token = jwt.sign({ id:user.id, name:user.name, email:user.email }, process.env.tokenSecretKey);
                res.status(200).json({token:token})
            } else {
                let name = response.data.name
                let email = response.data.email
                let password = name.split(' ')[0]+process.env.tokenSecretKey
                console.log(name, email, password, "======================= user baru")
                User
                .create({
                    name:name,
                    email:email,
                    password:password,
                })
                .then(function(user){
                    var token = jwt.sign({ id:user.id, name:user.name, email:user.email }, process.env.tokenSecretKey);
                    console.log("dari server token (user baru):", token )
                    res
                        .status(200)
                        .json({
                            token:token,
                            userId :user._id
                        })
                })
                .catch(function(err){
                    res
                        .status(400)
                        .json(err)
                })
            } 
        })
        .catch( err =>{
            res.status(400).json(err)
        })

    })
    .catch( err => {
        console.log(err)
        res.status(400).json({msg:"your acces token is not valid"})
    })
} 

module.exports = {
    login,
    loginFacebook,
    loginGoogle
}