import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILoginAPI, IRegisterAPI } from '../../API/interfaces';
import API from '../../API';
import actions from './actions';

const UserThunk = {
  login: createAsyncThunk(
    'user/login',
    async ({ setters, ...props }: ILoginAPI, { dispatch }) => {
      const { setErrors } = setters;
      setErrors({});
      const response = await API.User.login(props);
      const { ok, error, result } = response.data;
      if (ok) {
        dispatch(actions.login(result));
      } else {
        setErrors(error);
      }
    },
  ),
  register: createAsyncThunk(
    'user/register',
    async ({ setters, ...props }: IRegisterAPI, { dispatch }) => {
      const { setErrors } = setters;
      setErrors({});
      const response = await API.User.register(props);
      const { ok, error, result } = response.data;
      if (ok) {
        dispatch(actions.login(result));
      } else {
        setErrors(error);
      }
    },
  ),
  getMe: createAsyncThunk(
    'user/getMe',
    async (arg, { dispatch }) => {
      const { status, data: { result } } = await API.Me.get();
      switch (status) {
        case 200:
          dispatch(actions.login(result));
          break;
        case 401:
          dispatch(actions.logout());
          break;
        default:
      }
    },
  ),
  logout: createAsyncThunk(
    'user/logout',
    async (arg, { dispatch, rejectWithValue }) => {
      const response = await API.User.logout();
      const { ok } = response.data;
      if (ok) {
        dispatch(actions.logout());
      } else {
        return rejectWithValue('');
      }
      return 0;
    },
  ),
  getOrders: createAsyncThunk(
    'user/getOrders',
    async (arg, { dispatch }) => {
      const { data: { ok, result } } = await API.Order.getAll();
      if (ok) {
        dispatch(actions.setOrders(result));
      }
    },
  ),
};

export default UserThunk;
