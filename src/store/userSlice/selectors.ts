import { RootState } from '../index';

export const getAuth = (state: RootState) => state.user.auth;
export const getLoading = (state: RootState) => state.user.loading;
