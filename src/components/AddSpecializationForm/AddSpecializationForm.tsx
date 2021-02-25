import React, { useEffect, useState } from 'react';
import SpecializationsThunk from '../../store/specializationSlice/thunk';
import { Button, Field, Form } from '../ui';
import { useField, useSetters } from '../../shared/hooks';
import { validateAddSpecialization } from './validateAddSpecialization';
import { ISpecializationCreate } from '../../API/interfaces';
import { useAppDispatch } from '../../store';
import './style.css';

type PropsType = {
  close: () => void
  className?: string
};

export const AddSpecializationForm = ({
  close,
  className,
}: PropsType) => {
  /* hooks */
  const [getters, setters] = useSetters();
  const dispatch = useAppDispatch();

  /* fields */
  const title = useField('title', getters, setters);
  const icon = useField('icon', getters, setters);

  /* state */
  const [isValid, setIsValid] = useState(false);

  /* vars */
  const form: ISpecializationCreate = {
    title: title.props.value,
    icon: icon.props.value,
  };

  /* methods */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setters.setIsSubmitted(true);
    if (!isValid) {
      return;
    }
    const result = await dispatch(SpecializationsThunk.create(form));
    if (result.meta.requestStatus === 'rejected') {
      const error = result.payload;
      if (typeof error === 'string') {
        alert(error);
      } else {
        setters.setErrors(error);
      }
    } else {
      close();
    }
  };

  /* effects */
  useEffect(() => {
    setIsValid(validateAddSpecialization(form, setters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title, form.icon]);

  return (
    <Form className={`addSpecializationForm ${className || ''}`} onSubmit={handleSubmit}>
      <Field label="Title:" {...title.props} />
      <Field label="Icon:" {...icon.props} />
      <Button
        className="addSpecializationForm__add"
        type="submit"
      >
        Add
      </Button>
      <Button
        className="addSpecializationForm__cancel"
        variant="outline"
        onClick={close}
      >
        Cancel
      </Button>
    </Form>
  );
};
