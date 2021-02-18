import { useState } from 'react';
import { Getters, Setters, UseSettersType } from './types';

export const useSetters = (initialErrors: any = {}): UseSettersType => {
  /* state */
  const [errors, setErrors] = useState<any>(initialErrors);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* methods */
  const clearError = (name: string) => {
    const newErrors = { ...errors };
    delete newErrors[name];
    setErrors(newErrors);
  };

  /* getters */
  const getters: Getters = {
    errors,
    isSubmitted,
  };

  /* setters */
  const setters: Setters = {
    setErrors,
    clearError,
    setIsSubmitted,
  };

  return [getters, setters];
};
