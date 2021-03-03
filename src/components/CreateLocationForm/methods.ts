import { StateType as LocationsStateType } from '../../store/locationSlice/types';
import { SelectOptionType } from '../ui';
import { ILocationCreate } from '../../API/interfaces';
import { Setters } from '../../shared/hooks/useSetters/types';
import { LocationType } from '../../shared/types';

export const getLocationTypesOptions = (locations: LocationsStateType): SelectOptionType[] => (
  locations.loading ? [] : (
    locations.types.map((item) => ({
      title: item.title,
      value: item.id,
    }))
  )
);

export const getLocationParentsOptions = (locationsData: LocationType[]): SelectOptionType[] => {
  const result: SelectOptionType[] = [];
  locationsData.forEach((item) => {
    // @ts-ignore
    result.push({
      value: item.id,
      title: item.title,
    });
    item.children.forEach((item1) => {
      result.push({
        value: item1.id,
        title: item1.title,
      });
      item1.children.forEach((item2) => {
        result.push({
          value: item2.id,
          title: item2.title,
        });
      });
    });
  });
  return result;
};

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
