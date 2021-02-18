import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API';
import actions from './actions';
import { ILogin } from '../../API/interfaces';

const UserThunk = {
  login: createAsyncThunk(
    'user/login',
    async (props: ILogin, { dispatch }) => {
      const result = await API.User.login(props);
      const { ok, token } = result.data;
      if (ok) {
        dispatch(actions.setToken(token));
        localStorage.setItem('token', token);
      }
    },
  ),
};

export default UserThunk;
