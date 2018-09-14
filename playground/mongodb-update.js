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

  db.collection('Users').findOneAndUpdate({
    _id: 4567
  }, {
    $set: {
      name: 'Josh'
    },
    $inc: {
      age: -2
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
    closeDbConnection(client);
  });

  function closeDbConnection(client) {
    client.close((err, res) => {
      if (err) {
        console.log('Failed to Close MongoDB Connection: ', err);
      } else {
        console.log('Closed MongoDB Connection');
      }
    });
  }
});
