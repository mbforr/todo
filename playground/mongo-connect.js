const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to server')
  }
  console.log('Connected to server')

  const db = client.db('TodoApp')

  // db.collection('todo').insertOne({
  //   text: 'Go on a walk',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //   return console.log('Could not insert a todo!', err)
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  //
  // });

  db.collection('users').insertOne({
    name: 'Matt',
    age: 30,
    location: 'New York City'
    }, (err, result) => {
    if (err) {
    return console.log('Could not create a user!', err)
    }

    console.log(JSON.stringify(result.ops, undefined, 2));

  });

  client.close();
});
