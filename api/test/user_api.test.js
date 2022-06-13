const { connection } = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcryptjs');
const UserModel = require('../src/models/User');
const {
  app,
  server
} = require('../src/app');

const api = supertest(app);

const users = [
  {
    username: 'root',
    name: 'luis jesus',
    passwordHash: '12345678',
  },
  {
    username: 'castillo',
    name: 'luis jesus',
    passwordHash: '12345678',
  }
];

beforeEach(async () => {
  await UserModel.deleteMany({});

  const usersModel = users.map(user => {
    const password = bcrypt.hashSync(user.passwordHash, 10);
    return new UserModel({ ...user, passwordHash: password });
  });

  await Promise.all([
    ...usersModel.map(user => user.save())
  ]);

});

describe('when there is initially some users saved', () => {

  test('user are returned json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

  });

  test('all user are returned', async () => {
    const resp = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(resp.body).toHaveLength(users.length);
  });

});

describe('adding user in database', () => {

  test('a valid user can be added', async () => {

    const user = {
      username: 'alegria',
      name: 'pedro alegria',
      password: 'll)AA12345678-'
    };

    await api
      .post('/api/users')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const userAtEnd = await UserModel.find({ state: true });
    expect(userAtEnd).toHaveLength(users.length + 1);
    const content = userAtEnd.map(data => data.username);
    expect(content).toContain('alegria');
  });

  test('a error user unique can be added', async () => {

    const user = {
      username: 'castillo',
      name: 'carmelo',
      password: 'LL@123456o'
    };

    await api
      .post('/api/users')
      .send(user)
      .expect(500)
      .expect('Content-Type', /application\/json/);

    const userAtEnd = await UserModel.find({ state: true });
    expect(userAtEnd).toHaveLength(users.length);

  });

  test('a error user password security can be added', async () => {

    const user = {
      username: 'carmelo',
      name: 'carmelo',
      password: '1234'
    };

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const userAtEnd = await UserModel.find({ state: true });
    expect(userAtEnd).toHaveLength(users.length);
  });


  test('fails to create a user, username, name required bad/request', async () => {

    const user = {
      password: 'lC771501@'
    };

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const userAtEnd = await UserModel.find({ state: true });
    expect(userAtEnd).toHaveLength(users.length);
  });

});


afterAll(() => {
  connection.close();
  server.close();
});



