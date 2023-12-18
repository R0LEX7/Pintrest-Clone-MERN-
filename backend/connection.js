const mongoose = require('mongoose');


const uri = "mongodb://127.0.0.1:27017/mongodbPractice";
const atlasUri = process.env.URI

const connect = () => {
    try {
        mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("error connecting with database")
    }
};

module.exports = {
    connect
}
