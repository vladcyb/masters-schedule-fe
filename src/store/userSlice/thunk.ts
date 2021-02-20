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
    async () => {
      const result = await API.Me.get();
      console.log(result);
    },
  ),
};

export default UserThunk;
