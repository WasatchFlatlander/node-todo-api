const {
  MongoClient,
  ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {
  useNewUrlParser: true
}, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  const db = client.db('TodoApp');
  console.log('Connected to MongoDB Server');

  // const db = client.db('TodoApp');
  // db.collection('Todos').insertOne({
  //   text: 'Go Camping',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo: ', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // Insert new doc into Users (name, age, location)
  // db.collection('Users').insertOne({
  //   name: 'Josh',
  //   age: 28,
  //   location: 'Utah'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert User: ', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  client.close();
  console.log('MongoDB Server Connection Closed');
});
