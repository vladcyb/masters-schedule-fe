import { Setters } from '../../shared/hooks/useSetters/types';

export const validateSetSchedule = (hours: string, setters: Setters): boolean => {
  const errors: any = {};
  if (
    !(/^([([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .test(hours.replace(/\s/g, ''))
  ) {
    errors.hours = 'Hours must be in format `hh:mm-hh:mm`';
  }
  setters.setErrors(errors);
  return !errors.hours;
};
