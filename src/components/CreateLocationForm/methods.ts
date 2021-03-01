import { StateType as LocationsStateType } from '../../store/locationSlice/types';
import { SelectOptionType } from '../ui';
import { ILocationCreate } from '../../API/interfaces';
import { Setters } from '../../shared/hooks/useSetters/types';

export const getLocationTypesOptions = (locations: LocationsStateType): SelectOptionType[] => (
  locations.loading ? [] : (
    locations.types.map((item) => ({
      title: item.title,
      value: item.id,
    }))
  )
);

export const getLocationParentsOptions = (locations: LocationsStateType): SelectOptionType[] => (
  locations.data.map((item) => ({
    value: item.id,
    title: item.title,
  }))
);

type Errors = {
  title?: string
  coordinates?: string
  locationType?: string
};

export const validateCreateLocation = (form: ILocationCreate, setters: Setters): boolean => {
  const errors: Errors = {};
  if (!form.title) {
    errors.title = 'Enter title!';
  }
  if (!form.coordinates) {
    errors.coordinates = 'Enter coordinates!';
  }
  if (!form.typeId) {
    errors.locationType = 'Select type!';
  }
  setters.setErrors(errors);
  return !Object.keys(errors).length;
};
