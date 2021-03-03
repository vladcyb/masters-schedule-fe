import React, { useEffect, useMemo, useState } from 'react';
import { createCn } from 'bem-react-classname';
import { thunks } from '../../store/thunks';
import {
  Button, Field, Form, Select, Spinner,
} from '../ui';
import { useField, useSetters } from '../../shared/hooks';
import { ILocationCreate } from '../../API/interfaces';
import { useAppDispatch } from '../../store';
import { StateType as LocationsStateType } from '../../store/locationSlice/types';
import {
  getLocationParentsOptions,
  getLocationTypesOptions,
  validateCreateLocation,
} from './methods';
import './style.css';

type PropsType = {
  close: () => void
  className?: string
  locations: LocationsStateType
  isLoading: boolean
};

export const CreateLocationForm = ({
  close,
  className,
  locations,
  isLoading,
}: PropsType) => {
  /* hooks */
  const [getters, setters] = useSetters();
  const dispatch = useAppDispatch();

  /* state */
  const [isValid, setIsValid] = useState(false);

  /* classes */
  const cn = createCn('createLocationForm', className);

  /* fields */
  const title = useField('title', getters, setters);
  const coordinates = useField('coordinates', getters, setters);
  const typeOptions = useMemo(
    () => getLocationTypesOptions(locations),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locations.types],
  );
  const parentOptions = useMemo(
    () => getLocationParentsOptions(locations.data),
    [locations.data],
  );
  const [typeId, setTypeId] = useState<null | number>(null);
  const [parentId, setParentId] = useState<null | number>(null);

  /* vars */
  const form: ILocationCreate = {
    title: title.props.value,
    coordinates: coordinates.props.value,
    typeId: typeId as any,
  };

  /* methods */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setters.setIsSubmitted(true);
    if (!isValid || isLoading) {
      return;
    }
    if (typeof parentId === 'number') {
      form.parentId = parentId;
    }
    const result = await dispatch(thunks.location.create(form));
    if (result.meta.requestStatus !== 'rejected') {
      close();
    }
  };

  /* effects */
  useEffect(() => {
    dispatch(thunks.location.getTypes());
  }, [dispatch]);

  useEffect(() => {
    setIsValid(validateCreateLocation(form, setters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.typeId, form.title, form.coordinates, form.coordinates]);

  return (
    <Form className={cn()} onSubmit={handleSubmit}>
      <Field label="Title:" {...title.props} />
      <Field label="Coordinates:" {...coordinates.props} />
      <Select
        options={typeOptions}
        selected={typeId}
        setSelected={setTypeId}
        label="Type:"
      />
      <div className={cn('selectError')}>
        {getters.isSubmitted && getters.errors.locationType}
      </div>
      <Select
        className={cn('parent')}
        options={parentOptions}
        selected={parentId}
        setSelected={setParentId}
        label="Parent:"
      />
      <Button className="createLocationForm__create" type="submit">
        Create
      </Button>
      <Button className="createLocationForm__cancel" variant="outline" onClick={close}>
        Cancel
      </Button>
      <Spinner className="createLocationForm__spinner" visible={isLoading} />
    </Form>
  );
};