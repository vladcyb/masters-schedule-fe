import Responses from './responses';
import {
  ILocationCreate, ILocationEdit, ILoginForm, IMasterSetSchedule, IMasterSetSpecializations,
  IOrderSetMaster, IOrderSetServices, IOrderSetStartDate, IRegisterForm,
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
    create: (props: any) => (
      Responses(instance.post('/order', props, { withCredentials: true }))
    ),
    getAll: () => (
      Responses(instance.get('/order', { withCredentials: true }))
    ),
    setStartDate: ({ id, date }: IOrderSetStartDate) => (
      Responses(instance.put(`/order/${id}/setStartDate`, {
        date,
      }, { withCredentials: true }))
    ),
    setServices: ({ id, services }: IOrderSetServices) => (
      Responses(instance.put(
        `/order/${id}/setServices`, {
          services,
        }, { withCredentials: true },
      ))
    ),
    setMaster: ({ id, masterId }: IOrderSetMaster) => (
      Responses(instance.put(
        `/order/${id}/setMaster/${masterId}`,
        {},
        { withCredentials: true },
      ))
    ),
    deny: (id: number) => (
      Responses(instance.put(
        `/order/${id}/deny`,
        {},
        { withCredentials: true },
      ))
    ),
    abort: (id: number) => (
      Responses(instance.put(
        `/order/${id}/abort`,
        {},
        { withCredentials: true },
      ))
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
    edit: ({ id, ...props }: ILocationEdit) => (
      Responses(instance.put(`/location/${id}`, props, { withCredentials: true }))
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
      Responses(instance.put('/master/schedule', props, { withCredentials: true }))
    ),
    getSchedule: () => (
      Responses(instance.get('/master/schedule', { withCredentials: true }))
    ),
    getAll: () => (
      Responses(instance.get('/master', { withCredentials: true }))
    ),
    setSpecializations: (props: IMasterSetSpecializations) => (
      Responses(instance.put(`/master/${props.id}/setSpecializations`, {
        specializations: props.specializations,
      }, { withCredentials: true }))
    ),
    deleteSpecialization: (masterId: number, specializationId: number) => (
      Responses(instance.delete(`/master/${masterId}/specialization/${specializationId}`, {
        withCredentials: true,
      }))
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
