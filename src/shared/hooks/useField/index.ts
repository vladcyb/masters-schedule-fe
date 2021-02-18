import React, { useState } from 'react';
import { Getters, Setters } from '../useSetters/types';

export const useField = (
  name: string,
  getters: Getters,
  setters: Setters,
  initialValue = '',
) => {
  /* vars */
  const { isSubmitted, errors } = getters;
  const { clearError } = setters;

  /* state */
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  /* methods */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError(name);
    setValue(e.target.value);
  };

  const clear = () => {
    setValue('');
  };

  const onBlur = () => {
    setIsTouched(true);
  };

  return {
    props: {
      value,
      onChange,
      error: isTouched || isSubmitted ? errors[name] : '',
      name,
      onBlur,
    },
    clear,
  };
};
