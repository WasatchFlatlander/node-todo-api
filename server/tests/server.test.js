const expect = require('expect');
const request = require('supertest');
const {
  ObjectID
} = require('mongodb');
const app = require('./../server').app;
const {
  Todo
} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 1234
  }
];

beforeEach((done) => {
  Todo
    .remove({})
    .then(() => {
      Todo.insertMany(todos);
    })
    .then(() => done());
});

describe('POST /todos', () => {

  it('should create a new todo', (done) => {
    const text = 'Test todo text';
    request(app)
      .post('/todos')
      .send({
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({
            text
          })
          .then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch((e) => {
            done(e);
          })
      })
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find()
          .then((todos) => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch((e) => {
            done(e);
          })
      });
  });

});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  })
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    console.log(todos[0]._id.toHexString());
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    const id = new ObjectID();
    request(app)
      .get(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 400 for non-object ids', (done) => {
    const id = '5b9c2234571fcb0781f113a4234234123413411432';
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

});

describe('DEL /todos/:id', () => {
  it('should return del todo', (done) => {
    const hexId = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexId)
          .then((todo) => {
            expect(todo).toBe(null)
            done();
          })
          .catch((e) => done(e))
      });
  });

  it('should return 404 if todo not found', (done) => {
    const id = new ObjectID();
    request(app)
      .delete(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    const id = '5b9c2234571fcb0781f113a4234234123413411432';
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

});

describe('PATCH /todos/:id', () => {
  it('should return completed todo', (done) => {
    const hexId = todos[0]._id.toHexString();
    const updates = {
      completed: true,
      text: 'Go Camping'
    };
    request(app)
      .patch(`/todos/${hexId}`)
      .send(updates)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
        expect(res.body.todo.completed).toBe(updates.completed);
        expect(res.body.todo.text).toBe(updates.text);
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexId)
          .then((todo) => {
            expect(todo._id.toString()).toBe(hexId);
            expect(todo.completed).toBe(updates.completed)
            expect(todo.text).toBe(updates.text)
            expect(typeof todo.completedAt).toBe('number');
            done();
          })
          .catch((e) => done(e));
      });
  });
});

describe('PATCH /todos/:id', () => {
  it('should return incompleted todo', (done) => {
    const hexId = todos[1]._id.toHexString();
    const updates = {
      completed: false,
      text: 'Go Skiing'
    };
    request(app)
      .patch(`/todos/${hexId}`)
      .send(updates)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
        expect(res.body.todo.completed).toBe(updates.completed);
        expect(res.body.todo.text).toBe(updates.text);
        expect(res.body.todo.completedAt).toBe(null);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexId)
          .then((todo) => {
            expect(todo._id.toString()).toBe(hexId);
            expect(todo.completed).toBe(updates.completed)
            expect(todo.text).toBe(updates.text)
            expect(todo.completedAt).toBe(null);
            done();
          })
          .catch((e) => done(e))
      });
  });
});
