import { Dispatch, SetStateAction } from 'react';

export type Getters = {
  errors: any
};

export type Setters = {
  setErrors: Dispatch<SetStateAction<any>>
  clearError: (name: string) => void
};

export type UseSettersType = [Getters, Setters];
