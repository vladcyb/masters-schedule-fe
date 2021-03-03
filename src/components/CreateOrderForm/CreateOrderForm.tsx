import React, { useEffect, useState } from 'react';
import { createCn } from 'bem-react-classname';
import { useSelector } from 'react-redux';
import {
  Button, Field, Form, Select, Spinner, MultiSelect,
} from '../ui';
import { useField, useSetters } from '../../shared/hooks';
import { getLocations } from '../../store/locationSlice/selectors';
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
  const locations = useSelector(getLocations);
  const services = useSelector(getServices);
  const dispatch = useAppDispatch();

  /* state */
  const [selectedLocation, setSelectedLocation] = useState<number | undefined>(undefined);
  const [servicesOptions, setServicesOptions] = useState<MultiSelectOptionType[]>([]);
  const [photo, setPhoto] = useState<any>(null);
  const [isValid, setIsValid] = useState(false);

  /* methods */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    console.log(serviceIds.join(','));
  };

  /* fields */
  const description = useField('description', getters, setters);

  /* classes */
  const cn = createCn('createOrderForm', className);

  /* effects */
  useEffect(() => {
    dispatch(thunks.location.update());
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
      address: selectedLocation,
    }, setters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description.props.value, photo?.type, selectedLocation]);

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
      <div className={cn('error')}>
        {getters.isSubmitted && getters.errors.address}
      </div>
      <Spinner className={cn('spinner')} visible={locations.loading} />
      <UploadPhoto
        name="photo"
        label="Photo:"
        photo={photo}
        setPhoto={setPhoto}
        accept=".png,.jpg,.jpeg,.svg,.gif"
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