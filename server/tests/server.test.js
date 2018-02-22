const expect = require('expect')
const request = require('supertest')

var {app} = require('./../server')
var {Todo} = require('./../models/todo')

beforeEach((done) => {
  Todo.remove({}).then(() => done());
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
      Todo.find().then((todos) => { //checks that the data is the same as on the database
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
        expect(todos.length).toBe(0);
        done();
      }).catch((e) => done(e));
    });
  });
});
