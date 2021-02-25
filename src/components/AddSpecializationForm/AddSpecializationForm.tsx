import React from 'react';
import { Button, Form } from '../ui';

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
    <Form onSubmit={handleSubmit}>
      <Button type="submit">Add</Button>
      <Button variant="outline" onClick={close}>Cancel</Button>
    </Form>
  );
};
