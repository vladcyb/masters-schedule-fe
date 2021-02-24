import React, { useEffect, useMemo, useState } from 'react';
import { createCn } from 'bem-react-classname';
import {
  Button, Field, Select, SelectOptionType,
} from '../ui';
import { useField, useSetters } from '../../shared/hooks';
import { ILocationCreate } from '../../API/interfaces';
import { useAppDispatch } from '../../store';
import LocationThunk from '../../store/locationSlice/thunk';
import { StateType as LocationsStateType } from '../../store/locationSlice/types';
import './style.css';

type PropsType = {
  cancelAdding: () => void
  className?: string
  locations: LocationsStateType
};

const getLocationTypesOptions = (locations: LocationsStateType): SelectOptionType[] => (
  locations.loading ? [] : (
    locations.types.map((item) => ({
      title: item.title,
      value: item.id,
    }))
  )
);

const getLocationParentsOptions = (locations: LocationsStateType): SelectOptionType[] => (
  locations.data.map((item) => ({
    value: item.id,
    title: item.title,
  }))
);

export const AddLocationForm = ({
  cancelAdding,
  className,
  locations,
}: PropsType) => {
  /* hooks */
  const [getters, setters] = useSetters();
  const dispatch = useAppDispatch();

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

  /* methods */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof typeId !== 'number') {
      return;
    }
    const form: ILocationCreate = {
      title: title.props.value,
      coordinates: coordinates.props.value,
      typeId,
    };
    if (typeof parentId === 'number') {
      form.parentId = parentId;
    }
    await dispatch(LocationThunk.create(form));
    cancelAdding();
  };

  /* effects */
  useEffect(() => {
    dispatch(LocationThunk.getTypes());
  }, [dispatch]);

  return (
    <form className={cn()} onSubmit={handleSubmit} autoComplete="off">
      <Field label="Title:" {...title.props} />
      <Field label="Coordinates:" {...coordinates.props} />
      <Select options={typeOptions} selected={typeId} setSelected={setTypeId} label="Type:" />
      <Select
        className={cn('parent')}
        options={parentOptions}
        selected={parentId}
        setSelected={setParentId}
        label="Parent:"
      />
      <Button className="addLocationForm__add" type="submit">Add</Button>
      <Button className="addLocationForm__cancel" variant="outline" onClick={cancelAdding}>
        Cancel
      </Button>
    </form>
  );
};
