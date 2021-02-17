import { RootState } from '../index';

export const getToken = (state: RootState) => state.user.token;
