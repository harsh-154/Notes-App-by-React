const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/inotebook?tls=false&directConnection=true';
const connectToMongo = () => {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
};
module.exports = connectToMongo;