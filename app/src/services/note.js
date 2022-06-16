import axios from 'axios';

const Axios = axios.create({
  baseURL: '/api'
});

export const getToken = () => JSON.parse(window.localStorage.getItem('session'));

export const getNotes = async () => (await Axios.get('/notes')).data;

export const getNote = async (id) => (await Axios.get(`/notes/${id}`)).data;

export const createNote = async (note) => {
  const config = {
    headers: { Authorization: `bearer ${getToken().token}` }
  };

  console.log(config);
  return (await Axios.post('/notes',
    note,
    config
  )).data;
};

export const updateNote = async (id, note) => {
  const { content, date, state, important } = note;
  return (await Axios.put(`/notes/${id}`,
    {
      content,
      date,
      state,
      important
    }
  )).data;
};