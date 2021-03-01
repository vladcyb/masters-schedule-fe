import { ISpecializationCreate } from '../../API/interfaces';
import { Setters } from '../../shared/hooks/useSetters/types';
import { allowedImageFormats } from '../../shared/constants';

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
  } else if (!allowedImageFormats.includes(form.icon.type)) {
    errors.icon = 'Format is not supported!';
  }
  setters.setErrors(errors);
  return !(errors.title || errors.icon);
};
