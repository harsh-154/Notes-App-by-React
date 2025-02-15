const mongoose=require('mongoose');
const mongoURI='mongodb://localhost:27017/inotebook?tls=false&directConnection=true';
const connectToMongo=()=>{
    mongoose.connect(mongoURI);
    console.log("connected");
}
module.exports=connectToMongo;