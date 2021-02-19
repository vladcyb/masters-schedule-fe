import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API';
import actions from './actions';
import { ILoginAPI, IRegisterAPI } from '../../API/interfaces';

const AuthThunk = {
  login: createAsyncThunk(
    'auth/login',
    async ({ setters, ...props }: ILoginAPI, { dispatch }) => {
      const { setErrors } = setters;
      setErrors({});
      const result = await API.User.login(props);
      const { ok, error } = result.data;
      if (ok) {
        dispatch(actions.login());
      } else {
        setErrors(error);
      }
    },
  ),
  register: createAsyncThunk(
    'auth/register',
    async ({ setters, ...props }: IRegisterAPI, { dispatch }) => {
      const { setErrors } = setters;
      setErrors({});
      const result = await API.User.register(props);
      const { ok, error } = result.data;
      if (ok) {
        dispatch(actions.login());
      } else {
        setErrors(error);
      }
    },
  ),
};

export default AuthThunk;
