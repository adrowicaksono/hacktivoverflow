const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema({ 
    questionId: { type: Schema.Types.ObjectId, ref: 'Question'},
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    comment: String,
},{
    timestamps:true     
});


const Comment = mongoose.model('Comment', comment);

module.exports = Comment