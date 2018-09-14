const express = require('express');
const bodyParser = require('body-parser');

const {
  mongoose,
  connectMongoose
} = require('./db/mongoose');
const {
  Todo
} = require('./models/todo');
const {
  User
} = require('./models/user');

connectMongoose();
const app = express();

app.use(bodyParser.json());

app.post('/todos',(req, res) => {
  const todo = new Todo({
    text: req.body.text
  })
  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });

});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
})

module.exports.app = app;




// const newUser = new User({
//   email: 'Joshua.D.Clay@gmail.com'
// });

//create User Schema
// - Email - Required/Trim/String/min 1
//new instance of User

// Create new new User
// newUser.save()
//   .then((user) => {
//     console.log(`Saved User: ${user}`);
//   }, (err) => {
//     console.log(`Unable to save user: ${err}`);
//   })
//   .then(() => {
//     disconnectMongoose();
//   });

// Create new Todo
// const newTodo = new Todo({
//   text: 'Camping',
//   completed: false,
//   completedAt: 1300
// });
//
// newTodo.save()
//   .then((doc) => {
//     console.log(`Saved todo: ${doc}`);
//   }, (e) => {
//     console.log(`Unable to Save Todo: ${e}`);
//   }).then(() => {
//     disconnectMongoose();
//   });
