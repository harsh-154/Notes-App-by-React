const mongoose=require('mongoose');
const validator=require('validator');
const {Schema}=mongoose;
const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        minLength: 3
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('INVALID EMAIL');
            }
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    date:{
        type: Date,
        default: Date.now
    }
  });
const User=mongoose.model('user',userSchema);
// User.createIndexes();
module.exports=User;
