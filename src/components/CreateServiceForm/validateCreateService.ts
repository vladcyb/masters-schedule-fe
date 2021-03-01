import { Setters } from '../../shared/hooks/useSetters/types';
import { IServiceCreate } from '../../API/interfaces';

export const validateCreateService = (form: IServiceCreate, setters: Setters): boolean => {
  const errors: any = {};
  if (!form.title) {
    errors.title = 'Enter title!';
  }
  if (!form.duration) {
    errors.duration = 'Enter duration!';
  }
  if (!form.specializationId) {
    errors.specialization = 'Select specialization!';
  }
  if (!form.price) {
    errors.price = 'Enter price!';
  }
  setters.setErrors(errors);
  return !(errors.duration || errors.price || errors.specialization || errors.title);
};
