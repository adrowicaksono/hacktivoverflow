const Question = require('../models/question')
const jwt = require('jsonwebtoken')

const getHastag = function(hashtag){
    let stringTags = ''
    if(!hashtag){
        stringTags = '#general'
    }else{
        stringTags = hashtag
    }
    let strings = stringTags.split("#")
    let tags = strings.reduce(function(a, b){
        if(b){
            let tag = b.trim()
            if(tag){
                a.push(tag)
            }
        }
        return a
    }, [])
    return tags
}

const get = function(req, res){
    Question
    .find()
    .then(function(questions){
        res
            .status(200)
            .json(questions)
    })
    .catch(function(err){
        res
            .status(400)
    })
}

const add = function(req, res){

    jwt.verify(req.headers.token, process.env.tokenSecretKey, function(err, decoded) {
        if(err) res.status(401).json({msg:"is not user"})
        

        let hashtag = getHastag(req.body.tag)
        console.log(hashtag)
        
        Question
       .create({
            question:req.body.question,
            userId: decoded.id,
            tag: hashtag,
        })
        .then(function(question){
            //add google calender
            res
                .status(200)
                .json({
                    msg : "question has been created",
                    question : question
                })
        })
        .catch(function(err){
            res
                .status(400)
                .json({
                    msg : err.message,
                })
        })   
    });
    
}

const edit = function(req, res){
    console.log(req.query.id)
    jwt.verify(req.headers.token, process.env.tokenSecretKey, function(err, decoded) {
        if(err) res.status(401).json({msg:"is not user"})
            console.log(req.query.id)

            Question
            .findById(req.query.id)
            .then(function(question){
                let hashtag = getHastag(req.body.tag)
                console.log(question.userId, decoded.id)
                if(question.userId == decoded.id){
                    Question
                    .findByIdAndUpdate(question.id,{
                        question:req.body.question,
                        userId: decoded.id,
                        tag: hashtag,
                    })
                    .then(function(question){
                        res
                            .status(200)
                            .json({
                                msg : "update succesfully",
                                question : question
                            })
                    })
                    .catch(function(err){
                        res
                            .status(400)
                            .json({
                                msg:err.message
                            })
                    })
                }else{
                    res
                        .status(401)
                        .json({
                            msg : "is not your question"
                        })
                }                

            })
            .catch(function(err){
                res
                    .status(400)
                    .json({
                        msg: err. message
                    })
            })

    })
    
}

const remove = function(req, res){
    console.log("haiiihihih")
    jwt.verify(req.headers.token, process.env.tokenSecretKey, function(err, decoded) {
        if(err) res.status(401).json({msg:"is not user"})

        Question
            .findById(req.query.id)
            .then(function(question){
                if(question.userId == decoded.id){
                    Question
                    .findByIdAndRemove(req.query.id)
                    .then(function(question){
                        res
                            .status(200)
                            .json({
                                question:question,
                                msg:"delete successfully"
                            })
                    })
                    .catch(function(err){
                        res
                            .status(400)
                    })
                }else{
                    res
                        .status(401)
                        .json({
                            msg : "is not your question"
                        })
                }    
                

            })
            .catch(function(err){
                res
                    .status(400)
                    .json({
                        msg: err. message
                    })
            })


       
    })
}
module.exports = {
    get,
    add,
    remove,
    edit
}


