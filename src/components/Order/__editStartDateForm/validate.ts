import { Setters } from '../../../shared/hooks/useSetters/types';

type FormType = {
  date: string
  time: string
};

export const validateStartDateForm = (form: FormType, setters: Setters): boolean => {
  const errors: Partial<FormType> = {};
  if (form.date.length < 10) {
    errors.date = 'Введите дату!';
  }
  if (form.time.length < 5) {
    errors.time = 'Введите время!';
  }
  setters.setErrors(errors);
  return !(errors.date || errors.time);
};
