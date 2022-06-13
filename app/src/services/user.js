import axios from 'axios';


// eslint-disable-next-line import/prefer-default-export
export const login = async ({ password, username }) => (await axios.post('/api/login', {
  password,
  username
})).data;