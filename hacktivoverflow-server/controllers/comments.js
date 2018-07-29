const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')



const get = function(req, res){
    console.log(req.query.question_id)
    if(!req.query.question_id){
        res
        .status(404)
        .json({
            msg : "comment for what!"
        })
    }
    jwt.verify(req.headers.token, process.env.tokenSecretKey, function(err, decoded) {
        if(err) res.status(401).json({msg:"is not user"})
        Comment
        .find({
            questionId : req.query.question_id
        })
        .populate('userId')
        .populate('questionId')
        .then(function(comments){
            res
                .status(200)
                .json(comments)
        })
        .catch(function(err){
            res
                .status(400)
        })
    })
}

const add = function(req, res){
    if(!req.query.question_id){
        res
        .status(404)
        .json({
            msg : "comment for what!"
        })
    }
    jwt.verify(req.headers.token, process.env.tokenSecretKey, function(err, decoded) {
        if(err) res.status(401).json({msg:"is not user"})
        

        Comment
        .create({
            userId: decoded.id,
            questionId: req.query.question_id,
            comment:req.body.comment,
        })
        .then(function(comment){
            //add google calender
            res
                .status(200)
                .json({
                    msg : "comment has been created",
                    comment : comment
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
    if(!req.query.question_id){
        res
        .status(404)
        .json({
            msg : "comment for what!"
        })
    }
    console.log(req.query.id)
    jwt.verify(req.headers.token, process.env.tokenSecretKey, function(err, decoded) {
        if(err) res.status(401).json({msg:"is not user"})
            console.log(req.query.id)
            
        Comment
        .findById(req.query.id)
        .then(function(comment){
            if(comment.userId == decoded.id){
                Comment
                .findByIdAndUpdate(comment.id,{
                    userId: decoded.id,
                    questionId: req.query.question_id,
                    comment:req.body.comment,
                })
                .then(function(comment){
                    res
                        .status(200)
                        .json({
                            msg : "update succesfully",
                            comment : comment
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
                        msg : "is not your comments"
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
    
    
    jwt.verify(req.headers.token, process.env.tokenSecretKey, function(err, decoded) {
        if(err) res.status(401).json({msg:"is not user"})
            console.log(req.query.id)
            
        Comment
        .findById(req.query.id)
        .then(function(comment){
            if(comment.userId == decoded.id){
                Comment
                .findByIdAndRemove(req.query.id)
                .then(function(comment){
                    res
                        .status(200)
                        .json({
                            comment:comment,
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
                        msg : "is not your comments"
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

