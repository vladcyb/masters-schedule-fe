import React from 'react';
import { Button, Field, Form } from '../ui';
import { useField, useSetters } from '../../shared/hooks';
import './style.css';

type PropsType = {
  className?: string
  close: () => void
};

export const AddServiceForm = ({ className, close }: PropsType) => {
  /* hooks */
  const [getters, setters] = useSetters();

  /* fields */
  const title = useField('title', getters, setters);

  return (
    <Form className={`addServiceForm ${className || ''}`}>
      <Field label="Title:" {...title} />
      <Button className="addServiceForm__add">
        Add
      </Button>
      <Button className="addServiceForm__cancel" variant="outline" onClick={close}>
        Cancel
      </Button>
    </Form>
  );
};
