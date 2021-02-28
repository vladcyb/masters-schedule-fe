import * as axios from 'axios';
import { backendURL } from '../config.json';

const instance = axios.default.create({
  baseURL: backendURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
