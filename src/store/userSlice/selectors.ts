import { RootState } from '../index';

export const getToken = (state: RootState) => state.user.token;
export const getLoading = (state: RootState) => state.user.loading;
