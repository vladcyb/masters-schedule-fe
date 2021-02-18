import React, { useState } from 'react';
import { Getters, Setters } from '../useSetters/types';

export const useField = (
  name: string,
  getters: Getters,
  setters: Setters,
  initialValue = '',
) => {
  /* state */
  const [value, setValue] = useState(initialValue);

  /* methods */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setters.clearError(name);
    setValue(e.target.value);
  };
  const clear = () => {
    setValue('');
  };

  return {
    props: {
      value,
      onChange,
      error: getters.errors[name],
      name,
    },
    clear,
  };
};
