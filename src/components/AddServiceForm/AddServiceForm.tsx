import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SpecializationsThunk from '../../store/specializationSlice/thunk';
import {
  Button, Field, Form, Select, Spinner,
} from '../ui';
import { useField, useSetters } from '../../shared/hooks';
import { getSpecializations } from '../../store/specializationSlice/selectors';
import { useAppDispatch } from '../../store';
import { validateAddService } from './validateAddService';
import { IServiceCreate } from '../../API/interfaces';
import './style.css';

type PropsType = {
  className?: string
  close: () => void
};

export const AddServiceForm = ({ className, close }: PropsType) => {
  /* hooks */
  const [getters, setters] = useSetters();
  const specializations = useSelector(getSpecializations);
  const dispatch = useAppDispatch();

  const isLoading = specializations.loading;

  /* state */
  const [specializationId, setSpecializationId] = useState<number | undefined>(undefined);
  const [isValid, setIsValid] = useState(false);

  /* fields */
  const title = useField('title', getters, setters);
  const price = useField('price', getters, setters);
  const duration = useField('duration', getters, setters);

  /* form */
  const form: IServiceCreate = {
    title: title.props.value,
    duration: duration.props.value,
    price: price.props.value,
    specializationId: specializationId as any,
  };

  /* methods */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setters.setIsSubmitted(true);
    if (!isValid) {
      return;
    }
    console.log(form);
  };

  /* effects */
  useEffect(() => {
    dispatch(SpecializationsThunk.update());
  }, [dispatch]);

  useEffect(() => {
    setIsValid(validateAddService(form, setters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title, form.duration, form.price, form.specializationId]);

  return (
    <Form className={`addServiceForm ${className || ''}`} onSubmit={handleSubmit}>
      <Field label="Title:" {...title.props} />
      <Field label="Price:" {...price.props} />
      <Field label="Duration:" {...duration.props} />
      <Select
        className="addServiceForm__specializations"
        options={specializations.data.map((item) => ({
          title: item.title,
          value: item.id,
          icon: item.icon,
        }))}
        selected={specializationId}
        setSelected={setSpecializationId}
        label="Specialization:"
      />
      <div className="addServiceForm__specializationsError">
        {getters.isSubmitted && getters.errors.specialization}
      </div>
      <Button className="addServiceForm__add" type="submit">
        Add
      </Button>
      <Button className="addServiceForm__cancel" variant="outline" onClick={close}>
        Cancel
      </Button>
      <Spinner className="addServiceForm__spinner" visible={isLoading} />
    </Form>
  );
};
