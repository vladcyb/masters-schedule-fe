import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { thunks } from '../../store/thunks';
import {
  Button, Field, Form, Select, Spinner,
} from '../ui';
import { useField, useSetters } from '../../shared/hooks';
import { getSpecializations } from '../../store/specializationSlice/selectors';
import { useAppDispatch } from '../../store';
import { validateCreateService } from './validateCreateService';
import { IServiceCreate } from '../../API/interfaces';
import './style.css';

type PropsType = {
  className?: string
  close: () => void
  isLoading: boolean
};

export const CreateServiceForm = ({ className, close, isLoading }: PropsType) => {
  /* hooks */
  const [getters, setters] = useSetters();
  const specializations = useSelector(getSpecializations);
  const dispatch = useAppDispatch();

  /* state */
  const [specializationId, setSpecializationId] = useState<number | undefined>(undefined);
  const [isValid, setIsValid] = useState(false);

  /* fields */
  const title = useField('title', getters, setters);
  const price = useField('price', getters, setters, true);
  const duration = useField('duration', getters, setters, true);

  /* form */
  const form: IServiceCreate = {
    title: title.props.value,
    duration: parseInt(duration.props.value, 10),
    price: parseInt(price.props.value, 10),
    specializationId: specializationId as any,
  };

  /* methods */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setters.setIsSubmitted(true);
    if (!isValid || isLoading) {
      return;
    }
    const result = await dispatch(thunks.service.create(form));
    if (result.meta.requestStatus === 'fulfilled') {
      close();
    }
  };

  /* effects */
  useEffect(() => {
    dispatch(thunks.specialization.update());
  }, [dispatch]);

  useEffect(() => {
    setIsValid(validateCreateService(form, setters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title, form.duration, form.price, form.specializationId]);

  return (
    <Form className={`createServiceForm ${className || ''}`} onSubmit={handleSubmit}>
      <Field label="Название:" {...title.props} />
      <Field label="Стоимость:" {...price.props} />
      <Field label="Продолжительность (в часах):" {...duration.props} maxLength={8} />
      <Select
        className="createServiceForm__specializations"
        options={specializations.data.map((item) => ({
          title: item.title,
          value: item.id,
          icon: item.icon,
        }))}
        selected={specializationId}
        setSelected={setSpecializationId}
        label="Специализация:"
      />
      <div className="createServiceForm__specializationsError">
        {getters.isSubmitted && getters.errors.specialization}
      </div>
      <Button className="createServiceForm__create" type="submit">
        Создать
      </Button>
      <Button className="createServiceForm__cancel" variant="outline" onClick={close}>
        Отмена
      </Button>
      <Spinner className="createServiceForm__spinner" visible={isLoading} />
    </Form>
  );
};
