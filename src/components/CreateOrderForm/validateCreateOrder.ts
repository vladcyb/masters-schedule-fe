import { Setters } from '../../shared/hooks/useSetters/types';
import { IOrderCreate } from '../../API/interfaces';
import { allowedImageFormats } from '../../shared/constants';

export const validateCreateOrder = (
  form: Partial<{ [key in keyof IOrderCreate]: any }>,
  setters: Setters,
): boolean => {
  const errors: any = {};
  if (!form.description) {
    errors.description = 'Enter description!';
  }
  if (!form.photo) {
    errors.photo = 'Upload photo!';
  } else if (!allowedImageFormats.includes(form.photo.type)) {
    errors.photo = 'Format is not allowed!';
  }
  if (typeof form.address === 'undefined') {
    errors.address = 'Select location!';
  }
  setters.setErrors(errors);
  return !(errors.description || errors.address || errors.photo);
};
