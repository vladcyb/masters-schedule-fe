import Responses from './responses';
import {
  ILocationCreate,
  ILoginForm,
  IMasterSetSchedule,
  IOrderCreate,
  IOrderSetStatus,
  IRegisterForm,
  IServiceCreate,
} from './interfaces';
import instance from './axios';

const API = {
  User: {
    login: (props: ILoginForm) => (
      Responses(instance.post('/login', props, { withCredentials: true }))
    ),
    register: (props: IRegisterForm) => (
      Responses(instance.post('/register', props, { withCredentials: true }))
    ),
    logout: () => (
      Responses(instance.post('/logout', {}, { withCredentials: true }))
    ),
  },
  Order: {
    create: (props: IOrderCreate) => (
      Responses(instance.post('/order', props, { withCredentials: true }))
    ),
    setStatus: (props: IOrderSetStatus) => (
      Responses(instance.post('/order/updateStatus', props, { withCredentials: true }))
    ),
    getAll: () => (
      Responses(instance.get('/order', { withCredentials: true }))
    ),
  },
  Location: {
    create: (props: ILocationCreate) => (
      Responses(instance.post('/location', props, { withCredentials: true }))
    ),
    get: () => (
      Responses(instance.get('/location'))
    ),
    getTypes: () => (
      Responses(instance.get('locationType'))
    ),
    delete: (id: number) => (
      Responses(instance.delete(`/location/${id}`, { withCredentials: true }))
    ),
  },
  Specialization: {
    create: (props: FormData) => (
      Responses(instance.post('/specialization', props, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }))
    ),
    get: () => (
      Responses(instance.get('/specialization'))
    ),
  },
  Service: {
    create: (props: IServiceCreate) => (
      Responses(instance.post('/service', props, { withCredentials: true }))
    ),
    get: () => (
      Responses(instance.get('/service'))
    ),
  },
  Master: {
    setSchedule: (props: IMasterSetSchedule) => (
      Responses(instance.post('/master/schedule', props, { withCredentials: true }))
    ),
  },
  Client: {
    getOrders: () => (
      Responses(instance.get('/client/order', { withCredentials: true }))
    ),
  },
  Me: {
    get: () => (
      Responses(instance.get('/me', { withCredentials: true }))
    ),
  },
};

export default API;
