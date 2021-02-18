import Responses from './responses';
import { ILogin, IRegister } from './interfaces';
import instance from './axios';

const API = {
  User: {
    login: (props: ILogin) => (
      Responses(instance.post('/login', props))
    ),
    register: (props: IRegister) => (
      Responses(instance.post('/register', props))
    ),
  },
};

export default API;
