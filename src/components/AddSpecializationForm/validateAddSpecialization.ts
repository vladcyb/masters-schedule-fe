import { ISpecializationCreate } from '../../API/interfaces';
import { Setters } from '../../shared/hooks/useSetters/types';

export const validateAddSpecialization = (
  form: ISpecializationCreate,
  setters: Setters,
): boolean => {
  const errors: Partial<ISpecializationCreate> = {};
  if (!form.title) {
    errors.title = 'Enter title!';
  }
  if (!form.icon) {
    errors.icon = 'Upload icon!';
  }
  setters.setErrors(errors);
  return !(errors.title || errors.icon);
};
