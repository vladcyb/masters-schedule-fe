import { RootState } from '../index';

export const getLoading = (state: RootState) => state.user.loading;
export const getUserData = (state: RootState) => state.user.data;
