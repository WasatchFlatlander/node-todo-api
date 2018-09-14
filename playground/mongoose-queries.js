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

//const id = '5b9c2234571fcb0781f113a6';
// const id = '5b9c2234571fcb0781f112324234234';
//
//
// if(!ObjectID.isValid(id)){
//   console.log(`Invalid ID:${id}`);
// }
//
// Todo.find({
//     _id: id
//   })
//   .then((todos) => {
//     console.log(`Todos: ${todos}`);
//   }, (e) => {
//     console.log(`Error: ${e}`);
//   });
//
// Todo.findOne({
//     _id: id
//   })
//   .then((todo) => {
//     console.log(`Todo: ${todo}`);
//   }, (e) => {
//     console.log(`Error: ${e}`);
//   });
//
// Todo.findById(id)
//   .then((todo) => {
//     console.log(`Todo By Id: ${todo}`);
//   }, (e) => {
//     console.log(`Error: ${e}`);
//   });

//Query Users collection
const userId = '5b9c0a7b532423048c9868c7';
User.findById(userId)
  .then((user) => {
      if(!user){
        return console.log(`UserId(${userId}) not found!`);
      }
      console.log(`UserId(${userId}) found. User = ${user}`);
  }, (e) => {
    console.log(`Query Error: ${e}`);
  });
