const { connection } = require('mongoose');
const supertest = require('supertest');
const { app, server } = require('../src/app');
const NoteModel = require('../src/models/Note');
const helpers = require('./test_helper');

const api = supertest(app);


beforeEach(async () => {
  await NoteModel.deleteMany({});

  const noteObjects = helpers.initialNotes.map(note => new NoteModel(note));
  const promiseArray = noteObjects.map(note => note.save());
  await Promise.all(promiseArray);

});

describe('when there is initially some notes saved', () => {
  test('note are returned json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all note are returned', async () => {
    const resp = await api.get('/api/notes');
    expect(resp.body).toHaveLength(helpers.initialNotes.length);
  });

  test('a specific note is within the returned notes', async () => {
    const resp = await api.get('/api/notes');
    const contents = resp.body.map(r => r.content);
    expect(contents).toContain('Prueba testing jest 1');
  });

});

describe('viewing a specific note', () => {
  test('a specific note can be viewed', async () => {
    const notesAtStart = await helpers.noteInDb();
    const note = notesAtStart[0];

    const resp = await api
      .get(`/api/notes/${note.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const processedNoteToView = JSON.parse(JSON.stringify(note));
    expect(resp.body).toEqual(processedNoteToView);

  });


  test('error getting a note with an invalid id', async () => {
    const resp = await api
      .get('/api/notes/1')
      .expect(400);

    expect(resp.body.errors.id.msg).toContain('id');
  });
});

describe('addition of a new note', () => {
  test('a valid note can be added', async () => {
    const note = {
      content: 'async/await simplifies making async calls',
      important: true,
      date: new Date()
    };

    await api
      .post('/api/notes')
      .send(note)
      .expect(200)
      .expect('Content-Type', /application\/json/);


    const notesAtEnd = await helpers.noteInDb();
    expect(notesAtEnd).toHaveLength(helpers.initialNotes.length + 1);

    const content = notesAtEnd.map(data => data.content);
    expect(content).toContain('async/await simplifies making async calls');
  });

  test('note without content is not added', async () => {
    const note = {
      important: true
    };

    await api
      .post('/api/notes')
      .send(note)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const noteAtEnd = await helpers.noteInDb();
    expect(noteAtEnd).toHaveLength(helpers.initialNotes.length);

  });

});

describe('deletion of a note', () => {
  test('a note can be deleted', async () => {
    const noteAtStart = await helpers.noteInDb();
    const note = noteAtStart[0];

    await api
      .delete(`/api/notes/${note.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const noteAtEnd = await helpers.noteInDb();
    expect(noteAtEnd).toHaveLength(helpers.initialNotes.length - 1);

  });
});


afterAll(() => {
  connection.close();
  server.close();
});
