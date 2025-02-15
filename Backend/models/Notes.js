const mongoose=require('mongoose');
const {Schema}=mongoose;
const user=require('./User');
const notesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: user
    },
    title:{
        type: String,
        required: true,
        minLength: 3
    },
    description:{
        type: String,
        required: true,
        minLength: 5
    },
    tag:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    }
  });
  const notepad=mongoose.model('notes',notesSchema);
module.exports=notepad;
