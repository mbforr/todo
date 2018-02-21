const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to server')
  }
  console.log('Connected to server')

const db = client.db('TodoApp')

db.collection('todo').findOneAndUpdate(
{
  _id: new ObjectID('5a8de67b464d1ce96fc5a69e')
}, {
  $set: {completed: true}
}, {
  returnOriginal: false
}).then((result) => {
  console.log(result.value)
});

});
