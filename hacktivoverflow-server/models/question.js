const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const question = new Schema({ 
    question: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    tag:[],
},{
    timestamps:true     
});


const Question = mongoose.model('Question', question);

module.exports = Question
