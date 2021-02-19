import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API';
import actions from './actions';
import { ILoginAPI, IRegisterAPI } from '../../API/interfaces';

const UserThunk = {
  login: createAsyncThunk(
    'auth/login',
    async ({ setters, ...props }: ILoginAPI, { dispatch }) => {
      setters.setErrors({});
      const result = await API.User.login(props);
      const { ok, error } = result.data;
      if (ok) {
        dispatch(actions.login());
      } else {
        setters.setErrors(error);
      }
    },
  ),
  register: createAsyncThunk(
    'auth/register',
    async ({ setters, ...props }: IRegisterAPI) => {
      setters.setErrors({});
      const result = await API.User.register(props);
      console.log(result);
    },
  ),
};

export default UserThunk;
