import React, { useEffect, useState } from 'react';
import { thunks } from '../../store/thunks';
import {
  Button, Field, Form, Spinner,
} from '../ui';
import { useField, useSetters } from '../../shared/hooks';
import { useAppDispatch } from '../../store';
import { UploadPhoto } from '../ui/UploadPhoto';
import { validateAddSpecialization } from './validateAddSpecialization';
import './style.css';

type PropsType = {
  close: () => void
  className?: string
  isLoading: boolean
};

export const AddSpecializationForm = ({
  close,
  className,
  isLoading,
}: PropsType) => {
  /* hooks */
  const [getters, setters] = useSetters();
  const dispatch = useAppDispatch();

  /* fields */
  const title = useField('title', getters, setters);
  const [icon, setIcon] = useState<any>(null);

  /* state */
  const [isValid, setIsValid] = useState(false);

  const formData = new FormData();
  formData.append('title', title.props.value);
  formData.append('icon', icon);

  /* methods */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setters.setIsSubmitted(true);
    if (!isValid) {
      return;
    }
    const result = await dispatch(thunks.specialization.create(formData));
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
    setIsValid(validateAddSpecialization({
      title: title.props.value,
      icon,
    }, setters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title.props.value, icon]);

  return (
    <Form className={`addSpecializationForm ${className || ''}`} onSubmit={handleSubmit}>
      <Field label="Title:" {...title.props} />
      <UploadPhoto
        className="addSpecializationForm__upload"
        photo={icon}
        setPhoto={setIcon}
        label="Upload icon:"
        name="icon"
        error={getters.errors.icon}
        accept=".png,.jpg,.jpeg,.svg,.gif"
        isFormSubmitted={getters.isSubmitted}
      />
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
      <Spinner className="addSpecializationForm__spinner" visible={isLoading} />
    </Form>
  );
};
