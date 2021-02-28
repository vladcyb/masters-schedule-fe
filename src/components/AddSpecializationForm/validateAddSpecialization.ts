import { ISpecializationCreate } from '../../API/interfaces';
import { Setters } from '../../shared/hooks/useSetters/types';

type FormType = {
  title: string
  icon: any
};

export const validateAddSpecialization = (form: FormType, setters: Setters): boolean => {
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
