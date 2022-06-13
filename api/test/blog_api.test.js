const supertest = require('supertest');
const { connection } = require('mongoose');
const { app, server } = require('../src/app');
const BlogModel = require('../src/models/Blog');
const UserModel = require('../src/models/User');
const generarJWT = require('../src/helpers/generate-jwt');

const api = supertest(app);

const initialBlog = [
  {
    author: "UJAT",
    url: "https://www.ujat.mx/Noticias/Interior/30470",
    title: "Celebran en la DAMJM el día del niño",
    likes: 15,
    user: "627be8014c3c5ff0b40d8bc4"
  },
  {
    author: "UNAM",
    url: "http://www.ii.unam.mx/es-mx/AlmacenDigital/CapsulasTI/Paginas/hackers.aspx",
    title: "Hackers",
    likes: 5,
    user: "627be8014c3c5ff0b40d8bc4"
  },
  {
    author: "Mozilla",
    url: "Usar promesas",
    title: "https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises",
    likes: 8,
    user: "627be8014c3c5ff0b40d8bc4"
  },
];

beforeEach(async () => {
  await BlogModel.deleteMany({});
  const blogArray = initialBlog.map(blog => new BlogModel(blog));
  const blogArrayPromise = blogArray.map(blog => blog.save());
  await Promise.all(blogArrayPromise);
});


describe('when there is initially some blog saved', () => {

  test('return list the blogs', async () => {
    const resp = await api
      .get('/api/blogs')
      .expect(200);

    expect(resp.body).toHaveLength(initialBlog.length);
  });

  test('verify id is not _id in list blogs', async () => {
    const blogAtStart = await BlogModel.find({ status: true });
    const blog = blogAtStart[0];

    const resp = await api
      .get(`/api/blogs/${blog.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(resp.body.id).toBeDefined();

  });

});


describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const blog = {
      author: 'Midudev',
      likes: 100,
      title: 'Desarrollador Full Stack Javascript',
      url: 'https://www.facebook.com/midudev.frontend'
    };

    const user = await UserModel.findOne({ username: 'root' });
    const token = await generarJWT({ id: user._id });

    await api
      .post('/api/blogs')
      .set({ 'Authorization': `bearer ${token}` })
      .send(blog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const resp = await BlogModel.find({ status: true });
    expect(resp).toHaveLength(initialBlog.length + 1);

    const content = resp.map(data => data.author);
    expect(content).toContain('Midudev');

  });

  test('fails to create a blog, missing url and title bad/request', async () => {
    const blog = {
      author: 'Midudev',
      like: 100,
    };

    const user = await UserModel.findOne({ username: 'root' });
    const token = await generarJWT({ id: user._id });

    await api
      .post('/api/blogs')
      .set({ 'Authorization': `bearer ${token}` })
      .send(blog)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const resp = await BlogModel.find({ status: true });
    expect(resp).toHaveLength(initialBlog.length);

  });

  test('token  error, not a blog can be added', async () => {
    const blog = {
      author: 'Midudev',
      likes: 100,
      title: 'Desarrollador Full Stack Javascript',
      url: 'https://www.facebook.com/midudev.frontend'
    };

    const user = await UserModel.findOne({ username: 'root' });
    const token = await generarJWT({ id: user._id });

    await api
      .post('/api/blogs')
      .set({ 'Authorization': `bearer ${token}A` })
      .send(blog)
      .expect(500)
      .expect('Content-Type', /application\/json/);

    const resp = await BlogModel.find({ status: true });
    expect(resp).toHaveLength(initialBlog.length);
  });


});

describe('updation of a existing blog', () => {
  test('updating likes of a blog', async () => {
    const blogsAtStart = await BlogModel.find({ state: true });
    const blog = blogsAtStart[0];

    const resp = await api
      .put(`/api/blogs/${blog.id}`)
      .send({ likes: 10 })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(resp.body.likes).not.toBe(blog.likes);
  });

  test('updating blog likes without sending likes', async () => {
    const blogsAtStart = await BlogModel.find({ state: true });
    const blog = blogsAtStart[0];

    const resp = await api
      .put(`/api/blogs/${blog.id}`)
      .expect(400);

    expect(resp.body.errors.likes).toBeDefined();
  });

});

describe('Deletion blog element', () => {

  test('a blog can be deleted', async () => {
    const blogsAtStart = await BlogModel.find({ state: true });
    const blog = blogsAtStart[0];

    const user = await UserModel.findOne({ username: 'root' });
    const token = await generarJWT({ id: user._id });

    await api
      .delete(`/api/blogs/${blog.id}`)
      .set({ 'Authorization': `bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogAtEnd = await BlogModel.find({ state: true });
    expect(blogAtEnd).toHaveLength(initialBlog.length - 1);
  });

  test('delete a blog with an invalid id', async () => {

    const user = await UserModel.findOne({ username: 'root' });
    const token = await generarJWT({ id: user._id });

    const resp = await api
      .delete('/api/blogs/1')
      .set({ 'Authorization': `bearer ${token}` })
      .expect(400);

    expect(resp.body.errors.id).toBeDefined();

    const blogAtEnd = await BlogModel.find({ state: true });
    expect(blogAtEnd).toHaveLength(initialBlog.length);
  });

});


afterAll(() => {
  connection.close();
  server.close();
});