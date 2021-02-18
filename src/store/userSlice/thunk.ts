import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API';
import actions from './actions';
import { ILogin } from '../../API/interfaces';

const UserThunk = {
  login: createAsyncThunk(
    'user/login',
    async (props: ILogin, { dispatch }) => {
      const result = await API.User.login(props);
      const { ok } = result.data;
      if (ok) {
        dispatch(actions.login());
      }
    },
  ),
};

export default UserThunk;
