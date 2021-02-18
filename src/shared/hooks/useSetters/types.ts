import { Dispatch, SetStateAction } from 'react';

export type Getters = {
  errors: any
  isSubmitted: boolean
};

export type Setters = {
  setErrors: Dispatch<SetStateAction<any>>
  clearError: (name: string) => void
  setIsSubmitted: Dispatch<SetStateAction<boolean>>
};

export type UseSettersType = [Getters, Setters];
