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

  // Find by id
  // db.collection('Todos').find({
  //   _id: new ObjectID('5b9be353964c992c26d9a4b1')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  //   closeDbConnection(client);
  // }, (err) => {
  //   console.log('Unable to fetch todos:', err);
  //   closeDbConnection(client);
  // });

  // Count
  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos Count: ${count}`);
  //   closeDbConnection(client);
  // }, (err) => {
  //   console.log(`Unable to fetch todos: ${err}`);
  //   closeDbConnection(client);
  // });

  // Find by name
  db.collection('Users').find({
    name: 'Hosanna'
  }).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
    closeDbConnection(client);
  }, (err) => {
    console.log('Unable to fetch todos:', err);
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
