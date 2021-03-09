import { Setters } from '../../shared/hooks/useSetters/types';
import { IOrderCreate } from '../../API/interfaces';
import { allowedImageFormats } from '../../shared/constants';

export const validateCreateOrder = (
  form: Partial<{ [key in keyof IOrderCreate]: any }>,
  setters: Setters,
): boolean => {
  const errors: any = {};
  if (!form.description) {
    errors.description = 'Введити описание!';
  }
  if (!form.photo) {
    errors.photo = 'Загрузите фото!';
  } else if (!allowedImageFormats.includes(form.photo.type)) {
    errors.photo = 'Формат не поддерживается!';
  }
  if (!form.address) {
    errors.address = 'Введите адрес!';
  }
  setters.setErrors(errors);
  return !(errors.description || errors.address || errors.photo);
};
