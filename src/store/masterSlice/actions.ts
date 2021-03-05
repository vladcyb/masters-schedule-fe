import { createAction } from '@reduxjs/toolkit';

export const actions = {
  setSchedule: createAction<string>('master/setSchedule'),
};
