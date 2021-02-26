import React, { useState } from 'react';
import { createCn } from 'bem-react-classname';
import { useSelector } from 'react-redux';
import {
  Button, Field, Form, Select,
} from '../ui';
import { useField, useSetters } from '../../shared/hooks';
import { getLocations } from '../../store/locationSlice/selectors';
import './style.css';

type PropsType = {
  className?: string
  onCancel: () => void
};

export const AddOrderForm = ({
  className,
  onCancel,
}: PropsType) => {
  /* hooks */
  const [getters, setters] = useSetters();
  const locations = useSelector(getLocations);

  /* state */
  const [selectedLocation, setSelectedLocation] = useState<number | undefined>(undefined);

  /* methods */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  /* fields */
  const description = useField('description', getters, setters);
  const photo = useField('photo', getters, setters);

  /* classes */
  const cn = createCn('addOrderForm', className);
  console.log(description.props.value);
  return (
    <Form className={cn()} onSubmit={handleSubmit}>
      <Field
        className={cn('description')}
        label="Description:"
        textarea
        {...description.props}
      />
      <Select
        className={cn('address')}
        options={locations.data.map((item) => ({
          value: item.id,
          title: item.title,
        }))}
        selected={selectedLocation}
        setSelected={setSelectedLocation}
        label="Select address:"
      />
      <Field
        className={cn('photo')}
        label="Photo:"
        {...photo.props}
      />
      TODO: добавить список услуг
      <Button className={cn('submit')} type="submit">Add</Button>
      <Button
        className={cn('cancel')}
        onClick={onCancel}
        variant="outline"
      >
        Cancel
      </Button>
    </Form>
  );
};
