import React, { useState } from 'react';

export const useInput = (initialValue = '') => {
  /* state */
  const [value, setValue] = useState(initialValue);

  /* methods */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
  };
};
