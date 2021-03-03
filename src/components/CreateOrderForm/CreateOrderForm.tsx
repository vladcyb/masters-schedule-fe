import React, { useEffect, useState } from 'react';
import { createCn } from 'bem-react-classname';
import { useSelector } from 'react-redux';
import {
  Button, Field, Form, MultiSelect,
} from '../ui';
import { useField, useSetters } from '../../shared/hooks';
import { useAppDispatch } from '../../store';
import { getServices } from '../../store/serviceSlice/selectors';
import { thunks } from '../../store/thunks';
import { MultiSelectOptionType } from '../ui/MultiSelect/types';
import { UploadPhoto } from '../ui/UploadPhoto';
import { validateCreateOrder } from './validateCreateOrder';
import './style.css';

type PropsType = {
  className?: string
  onCancel: () => void
};

export const CreateOrderForm = ({
  className,
  onCancel,
}: PropsType) => {
  /* hooks */
  const [getters, setters] = useSetters();
  const services = useSelector(getServices);
  const dispatch = useAppDispatch();

  /* fields */
  const address = useField('address', getters, setters);
  const description = useField('description', getters, setters);

  /* state */
  const [servicesOptions, setServicesOptions] = useState<MultiSelectOptionType[]>([]);
  const [photo, setPhoto] = useState<any>(null);
  const [isValid, setIsValid] = useState(false);

  /* form */
  const formData = new FormData();
  formData.append('description', description.props.value);
  formData.append('photo', photo);
  formData.append('address', address.props.value);

  /* methods */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setters.setIsSubmitted(true);
    if (!isValid) {
      return;
    }
    const serviceIds: number[] = [];
    servicesOptions.forEach((option) => {
      if (option.selected) {
        serviceIds.push(option.value);
      }
    });
    const actionsResponse = await dispatch(thunks.user.createOrder(formData));
    if (actionsResponse.meta.requestStatus === 'fulfilled') {
      onCancel();
    }
  };

  /* classes */
  const cn = createCn('createOrderForm', className);

  /* effects */
  useEffect(() => {
    dispatch(thunks.service.update());
  }, [dispatch]);

  useEffect(() => {
    setServicesOptions(
      services.data.map((item) => ({
        value: item.id,
        title: item.title,
        selected: false,
      })),
    );
  }, [services.data]);

  useEffect(() => {
    setIsValid(validateCreateOrder({
      description: description.props.value,
      photo,
      address: address.props.value,
    }, setters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description.props.value, photo?.type, address.props.value]);

  return (
    <Form className={cn()} onSubmit={handleSubmit}>
      <Field
        className={cn('description')}
        label="Description:"
        textarea
        {...description.props}
      />
      <Field label="Address:" {...address.props} />
      <UploadPhoto
        name="photo"
        label="Photo:"
        photo={photo}
        setPhoto={setPhoto}
        isFormSubmitted={getters.isSubmitted}
        error={getters.errors.photo}
      />
      <MultiSelect
        className={cn('services')}
        options={servicesOptions}
        setOptions={setServicesOptions}
        label="Services:"
      />
      <div className={cn('error')}>
        {getters.isSubmitted && getters.errors.service}
      </div>
      <Button
        className={cn('create')}
        type="submit"
      >
        Create
      </Button>
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
