const mongoose = require('mongoose');


const uri = "mongodb://127.0.0.1:27017/mongodbPractice";

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