import { Setters } from '../../shared/hooks/useSetters/types';
import { IServiceCreate } from '../../API/interfaces';

export const validateCreateService = (form: IServiceCreate, setters: Setters): boolean => {
  const errors: any = {};
  if (!form.title) {
    errors.title = 'Введите название!';
  }
  if (!form.duration) {
    errors.duration = 'Введите продолжительность!';
  }
  if (!form.specializationId) {
    errors.specialization = 'Выберите специализацию!';
  }
  if (!form.price) {
    errors.price = 'Введите стоимость!';
  }
  setters.setErrors(errors);
  return !(errors.duration || errors.price || errors.specialization || errors.title);
};
