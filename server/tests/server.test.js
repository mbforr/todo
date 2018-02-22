const expect = require('expect')
const request = require('supertest')

var {app} = require('./../server')
var {Todo} = require('./../models/todo')

const todos = [{
  text: 'a'
}, {
  text: 'b'
}]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done());
});

describe('POST /todos', () => {
  it('Should create a new todo', (done) => {
    var text = 'test todo text';

    request(app)
      .post('/todos') //get the post route
      .send({text}) //send the text variable listed above in this case
      .expect(200) //should be 200
      .expect((res) => {
        expect(res.body.text).toBe(text); //should be the same text as the other text variabls
      })
    .end((err, res) => {
      if (err) {
        return done(err)
      }
      Todo.find({text}).then((todos) => { //checks that the data is the same as on the database
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
  });
  it('Should not create a new todo without a valid text body', (done) => {

    request(app)
      .post('/todos') //get the post route
      .send({}) //send the text variable listed above in this case
      .expect(400) //should be 200
    .end((err, res) => {
      if (err) {
        return done(err)
      }
      Todo.find().then((todos) => { //checks that the data is the same as on the database
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
  });
});

describe('GET /todos', () => {
  it('Should get all of the todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2)
    })
    .end(done)
  })
})
