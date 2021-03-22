import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createCn } from 'bem-react-classname';
import { thunks } from '../../store/thunks';
import {
  Button, Field, Form, MultiSelect, Select, Spinner,
} from '../ui';
import { useField, useSetters } from '../../shared/hooks';
import { IRegisterForm, UserRole } from '../../API/interfaces';
import { validateRegistration } from './validate';
import { useAppDispatch } from '../../store';
import { getLocations } from '../../store/locationSlice/selectors';
import { getSpecializations } from '../../store/specializationSlice/selectors';
import { ROLES } from '../../shared/constants';
import { MultiSelectOptionType } from '../ui/MultiSelect/types';
import './style.css';

type PropsType = {
  className?: string
  isLoading: boolean
};

export const RegisterForm = ({ className, isLoading }: PropsType) => {
  /* classes */
  const cn = createCn('registerForm', className);

  /* state */
  const [isValid, setIsValid] = useState(true);
  const [isMasterOptionsLoading, setIsMasterOptionsLoading] = useState(false);

  /* hooks */
  const [getters, setters] = useSetters();
  const dispatch = useAppDispatch();
  const locations = useSelector(getLocations);
  const specializations = useSelector(getSpecializations);
  const masterOptionsError = locations.error || specializations.error;

  /* fields state */
  const login = useField('login', getters, setters);
  const password = useField('password', getters, setters);
  const passwordRepeat = useField('passwordRepeat', getters, setters);
  const surname = useField('surname', getters, setters);
  const name = useField('name', getters, setters);
  const patronymic = useField('patronymic', getters, setters);
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.CLIENT);
  const [specializationOptions, setSpecializationOptions] = useState<MultiSelectOptionType[]>([]);
  const [locationId, setLocationId] = useState<number | undefined>(undefined);

  const getSpecializationIds = (): number[] => {
    const result: number[] = [];
    specializationOptions.forEach((item) => {
      if (item.selected) {
        result.push(item.value);
      }
    });
    return result;
  };

  /* effects */
  useEffect(() => {
    const specializationIds = getSpecializationIds();
    const form: IRegisterForm = {
      login: login.props.value,
      password: password.props.value,
      passwordRepeat: passwordRepeat.props.value,
      surname: surname.props.value,
      name: name.props.value,
      patronymic: patronymic.props.value,
      role: selectedRole,
      locationId,
      specializationIds,
    };
    setIsValid(validateRegistration(form, setters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    login.props.value,
    password.props.value,
    passwordRepeat.props.value,
    surname.props.value,
    name.props.value,
    patronymic.props.value,
    selectedRole,
    locationId,
    specializationOptions,
  ]);

  useEffect(() => {
    const loadData = async () => {
      setIsMasterOptionsLoading(true);
      await Promise.all([
        dispatch(thunks.specialization.update()),
        dispatch(thunks.location.update()),
      ]);
      setIsMasterOptionsLoading(false);
    };
    if (selectedRole === UserRole.MASTER) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRole]);

  useEffect(() => {
    if (!specializations.loading) {
      setSpecializationOptions(specializations.data.map((item) => ({
        title: item.title,
        value: item.id,
        selected: false,
      })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specializations.loading]);

  /* methods */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setters.setIsSubmitted(true);
    if (!isValid || isLoading) {
      return;
    }
    const specializationIds = getSpecializationIds();
    dispatch(thunks.user.register({
      login: login.props.value,
      password: password.props.value,
      passwordRepeat: passwordRepeat.props.value,
      role: selectedRole,
      specializationIds,
      surname: surname.props.value,
      name: name.props.value,
      patronymic: patronymic.props.value,
      locationId,
      setters,
    }));
  };

  return (
    <Form className={cn()} onSubmit={handleSubmit}>
      <Field label="Логин:" {...login.props} />
      <Field label="Пароль:" {...password.props} type="password" />
      <Field label="Повторите пароль:" {...passwordRepeat.props} type="password" />
      <Field label="Фамилия:" {...surname.props} />
      <Field label="Имя:" {...name.props} />
      <Field label="Отчество:" {...patronymic.props} />
      <Select
        className={cn('role')}
        options={ROLES}
        selected={selectedRole}
        label="Роль:"
        setSelected={setSelectedRole}
      />
      {isMasterOptionsLoading && (
        <Spinner className={cn('masterSpinner')} visible />
      )}
      {selectedRole === UserRole.MASTER && !isMasterOptionsLoading && !masterOptionsError && (
        <>
          <MultiSelect
            className={cn('specializations')}
            options={specializationOptions}
            setOptions={setSpecializationOptions}
            label="Специализация:"
          />
          <div className={cn('selectError')}>
            {getters.isSubmitted && getters.errors.specializationIds}
          </div>
          <Select
            className={cn('locations')}
            options={locations.data.map((item) => ({
              title: item.title,
              value: item.id,
            }))}
            selected={locationId}
            setSelected={setLocationId}
            label="Местоположение:"
          />
          <div className={cn('selectError')}>
            {getters.isSubmitted && getters.errors.locationId}
          </div>
        </>
      )}
      {masterOptionsError && (
        <div className={cn('error')}>Something went wrong</div>
      )}
      <Button className={cn('submit')} type="submit">
        Зарегистрироваться
      </Button>
      <Link className={cn('login navlink')} to="/login">
        Войти
      </Link>
      <Spinner className={cn('spinner')} visible={isLoading} />
    </Form>
  );
};
