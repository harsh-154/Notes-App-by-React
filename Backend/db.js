const mongoose=require('mongoose');
const mongoURI='mongodb+srv://23ucs585:MongoDB@2005@cluster.lpttc7q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';
const connectToMongo=()=>{
    mongoose.connect(mongoURI);
    console.log("connected");
}
module.exports=connectToMongo;