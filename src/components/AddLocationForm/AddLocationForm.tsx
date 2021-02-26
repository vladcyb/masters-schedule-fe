import React, { useEffect, useMemo, useState } from 'react';
import { createCn } from 'bem-react-classname';
import LocationThunk from '../../store/locationSlice/thunk';
import {
  Button, Field, Form, Select,
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
};

export const AddLocationForm = ({
  close,
  className,
  locations,
}: PropsType) => {
  /* hooks */
  const [getters, setters] = useSetters();
  const dispatch = useAppDispatch();

  /* state */
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* classes */
  const cn = createCn('addLocationForm', className);

  /* fields */
  const title = useField('title', getters, setters);
  const coordinates = useField('coordinates', getters, setters);
  const typeOptions = useMemo(
    () => getLocationTypesOptions(locations),
    [locations],
  );
  const parentOptions = useMemo(
    () => getLocationParentsOptions(locations),
    [locations],
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
    setIsLoading(true);
    const result = await dispatch(LocationThunk.create(form));
    setIsLoading(false);
    if (result.meta.requestStatus !== 'rejected') {
      close();
    }
  };

  /* effects */
  useEffect(() => {
    dispatch(LocationThunk.getTypes());
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
      <Button className="addLocationForm__add" type="submit">Add</Button>
      <Button className="addLocationForm__cancel" variant="outline" onClick={close}>
        Cancel
      </Button>
    </Form>
  );
};
