import React from 'react';
import { Button } from '../ui';

type PropsType = {
  close: () => void
};

export const AddSpecializationForm = ({
  close,
}: PropsType) => {
  /* methods */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit">Add</Button>
      <Button variant="outline" onClick={close}>Cancel</Button>
    </form>
  );
};
