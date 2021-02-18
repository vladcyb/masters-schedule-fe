import * as axios from 'axios';

const instance = axios.default.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
