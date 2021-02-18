import Responses from './responses';
import {
  ILogin,
  IOrderCreate,
  IOrderSetStatus,
  IRegister,
} from './interfaces';
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
  Order: {
    create: (props: IOrderCreate) => (
      Responses(instance.post('/order/create', props))
    ),
    setStatus: (props: IOrderSetStatus) => (
      Responses(instance.post('/order/updateStatus', props))
    ),
  },
};

export default API;
