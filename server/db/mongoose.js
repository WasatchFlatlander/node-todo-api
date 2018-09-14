const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

function connectMongoose() {
  mongoose.connect('mongodb://localhost:27017/TodoApp', {
    useNewUrlParser: true
  }).then((res) => {
    console.log('Successfully connected to Mongoose');
  }, (err) => {
    console.log('Failed to connect to Mongoose');
  });
}

function disconnectMongoose() {
  mongoose.disconnect()
    .then((res) => {
      console.log('Successfully Disconnected Mongoose');
    }, (err) => {
      console.log('Failed To Disconnected Mongoose');
    });
}

module.exports = { mongoose, connectMongoose };
