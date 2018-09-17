const {
  mongoose
} = require('./../server/db/mongoose');
const {
  Todo
} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');
const {
  User
} = require('./../server/models/user');

Todo.remove({}).then((res) => {
  console.log(res);
});
