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

  //deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  //   closeDbConnection(client);
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  //   closeDbConnection(client);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  //   closeDbConnection(client);
  // });

  //deleteMany Users
  // db.collection('Users').deleteMany({name: 'Josh'}).then((result) => {
  //   console.log(result);
  //   closeDbConnection(client);
  // });

  //findOneAndDeleteById Users
  db.collection('Users').findOneAndDelete({_id: 456}).then((result) => {
    console.log(result);
    closeDbConnection(client);
  });
  // client.close();
  // console.log('MongoDB Server Connection Closed');
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
