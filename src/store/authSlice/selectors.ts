import { RootState } from '../index';

export const getAuth = (state: RootState) => state.auth.auth;
export const getLoading = (state: RootState) => state.auth.loading;
