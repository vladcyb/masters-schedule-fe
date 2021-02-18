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
      Responses(instance.post('/order/create', props, { withCredentials: true }))
    ),
    setStatus: (props: IOrderSetStatus) => (
      Responses(instance.post('/order/updateStatus', props, { withCredentials: true }))
    ),
  },
  Location: {
    create: (props: ILocationCreate) => (
      Responses(instance.post('/location/create', props, { withCredentials: true }))
    ),
  },
  Specialization: {
    create: (props: ISpecializationCreate) => (
      Responses(instance.post('/specialization/create', props, { withCredentials: true }))
    ),
  },
  Service: {
    create: (props: IServiceCreate) => (
      Responses(instance.post('/service/create', props, { withCredentials: true }))
    ),
  },
  Master: {
    setSchedule: (props: IMasterSetSchedule) => (
      Responses(instance.post('/master/schedule', props, { withCredentials: true }))
    ),
  },
  Client: {
    getOrders: (props: { token: string }) => (
      Responses(instance.get('/client/order', {
        headers: {
          Authorization: props.token,
        },
        withCredentials: true,
      }))
    ),
  },
};

export default API;
