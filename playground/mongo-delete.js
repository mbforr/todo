const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to server')
  }
  console.log('Connected to server')

const db = client.db('TodoApp')

// db.collection('todo').deleteMany({text: 'Eat Lunch'}).then((result) => {
//   console.log(result)
// });

// db.collection('todo').deleteOne({text: 'Eat Lunch'}).then((result) => {
//   console.log(result)
// });

db.collection('todo').findOneAndDelete({completed: false}).then((result) => {
  console.log(result)
});


});
