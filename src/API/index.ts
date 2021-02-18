import Responses from './responses';
import {
  ILocationCreate,
  ILogin, IMasterSetSchedule,
  IOrderCreate,
  IOrderSetStatus,
  IRegister, IServiceCreate,
  ISpecializationCreate,
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
  Location: {
    create: (props: ILocationCreate) => (
      Responses(instance.post('/location/create', props))
    ),
  },
  Specialization: {
    create: (props: ISpecializationCreate) => (
      Responses(instance.post('/specialization/create', props))
    ),
  },
  Service: {
    create: (props: IServiceCreate) => (
      Responses(instance.post('/service/create', props))
    ),
  },
  Master: {
    setSchedule: (props: IMasterSetSchedule) => (
      Responses(instance.post('/master/schedule', props))
    ),
  },
  Client: {
    getOrders: (props: { token: string }) => (
      Responses(instance.get('/client/order', {
        headers: {
          Authorization: props.token,
        },
      }))
    ),
  },
};

export default API;
