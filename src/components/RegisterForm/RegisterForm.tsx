import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createCn } from 'bem-react-classname';
import { thunks } from '../../store/thunks';
import {
  Button, Field, Form, Select, Spinner,
} from '../ui';
import { useField, useSetters } from '../../shared/hooks';
import { IRegisterForm, UserRole } from '../../API/interfaces';
import { validateRegistration } from './validate';
import { useAppDispatch } from '../../store';
import { getLocations } from '../../store/locationSlice/selectors';
import { getSpecializations } from '../../store/specializationSlice/selectors';
import { ROLES } from '../../shared/constants';
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
  const [specializationId, setSpecializationId] = useState<number | undefined>(undefined);
  const [locationId, setLocationId] = useState<number | undefined>(undefined);

  /* vars */
  const form: IRegisterForm = {
    login: login.props.value,
    password: password.props.value,
    passwordRepeat: passwordRepeat.props.value,
    surname: surname.props.value,
    name: name.props.value,
    patronymic: patronymic.props.value,
    role: selectedRole,
    locationId,
    specializationId,
  };

  /* effects */
  useEffect(() => {
    setIsValid(validateRegistration(form, setters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    form.login,
    form.password,
    form.passwordRepeat,
    form.surname,
    form.name,
    form.patronymic,
    form.role,
    form.locationId,
    form.specializationId,
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

  /* methods */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setters.setIsSubmitted(true);
    if (!isValid || isLoading) {
      return;
    }
    dispatch(thunks.user.register({ ...form, setters }));
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
          <Select
            className={cn('specializations')}
            options={specializations.data.map((item) => ({
              title: item.title,
              value: item.id,
              icon: item.icon,
            }))}
            selected={specializationId}
            setSelected={setSpecializationId}
            label="Специализация:"
          />
          <div className={cn('selectError')}>
            {getters.isSubmitted && getters.errors.specializationId}
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
