import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API';
import actions from './actions';
import { ILoginProps } from '../../API/interfaces';

const UserThunk = {
  login: createAsyncThunk(
    'user/login',
    async ({ setters, ...props }: ILoginProps, { dispatch }) => {
      setters.setErrors({});
      const result = await API.User.login(props);
      const { ok, error } = result.data;
      if (ok) {
        dispatch(actions.login());
      } else {
        console.log(error);
        setters.setErrors(error);
      }
    },
  ),
};

export default UserThunk;
