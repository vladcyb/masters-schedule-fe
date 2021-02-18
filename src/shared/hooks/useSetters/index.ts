import { useState } from 'react';
import { Getters, Setters, UseSettersType } from './types';

export const useSetters = (initialErrors: any = {}): UseSettersType => {
  /* state */
  const [errors, setErrors] = useState<any>(initialErrors);

  /* methods */
  const clearError = (name: string) => {
    const newErrors = { ...errors };
    delete newErrors[name];
    setErrors(newErrors);
  };

  /* getters */
  const getters: Getters = {
    errors,
  };

  /* setters */
  const setters: Setters = {
    setErrors,
    clearError,
  };

  return [getters, setters];
};
