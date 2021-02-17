import React, { useState } from 'react';

export const useField = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const clear = () => {
    setValue('');
  };

  return {
    props: {
      value,
      onChange,
    },
    clear,
  };
};
