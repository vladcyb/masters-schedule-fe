import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createCn } from 'bem-react-classname';
import AuthThunk from '../../store/authSlice/thunk';
import SpecializationsThunk from '../../store/specializationSlice/thunk';
import LocationThunk from '../../store/locationSlice/thunk';
import {
  Button, Field, Select, SelectOptions, Spinner,
} from '../ui';
import { useField, useSetters } from '../../shared/hooks';
import { getLoading } from '../../store/authSlice/selectors';
import { IRegisterForm, UserRole } from '../../API/interfaces';
import { validateRegistration } from './validate';
import { useAppDispatch } from '../../store';
import './style.css';

const roles: SelectOptions<UserRole> = [
  { value: UserRole.CLIENT, title: 'Client' },
  { value: UserRole.MASTER, title: 'Master' },
  { value: UserRole.ADMIN, title: 'Administrator' },
  { value: UserRole.OPERATOR, title: 'Operator' },
  { value: UserRole.RESPONSIBLE, title: 'Responsible' },
];

type PropsType = {
  className?: string
};

export const Register = ({ className }: PropsType) => {
  /* classes */
  const cn = createCn('register', className);

  /* state */
  const [isValid, setIsValid] = useState(true);
  const [isMasterOptionsLoading, setIsMasterOptionsLoading] = useState(false);

  /* hooks */
  const [getters, setters] = useSetters();
  const isLoading = useSelector(getLoading);
  const dispatch = useAppDispatch();

  /* fields state */
  const login = useField('login', getters, setters);
  const password = useField('password', getters, setters);
  const passwordRepeat = useField('passwordRepeat', getters, setters);
  const surname = useField('surname', getters, setters);
  const name = useField('name', getters, setters);
  const patronymic = useField('patronymic', getters, setters);
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.CLIENT);

  /* vars */
  const form: IRegisterForm = {
    login: login.props.value,
    password: password.props.value,
    passwordRepeat: passwordRepeat.props.value,
    surname: surname.props.value,
    name: name.props.value,
    patronymic: patronymic.props.value,
    role: selectedRole,
  };

  /* effects */
  useEffect(() => {
    setIsValid(validateRegistration(form, setters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, Object.values(form));

  useEffect(() => {
    const loadData = async () => {
      setIsMasterOptionsLoading(true);
      await Promise.all([
        dispatch(SpecializationsThunk.update()),
        dispatch(LocationThunk.update()),
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
    dispatch(AuthThunk.register({
      ...form,
      setters,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value as UserRole);
  };

  return (
    <form className={cn()} onSubmit={handleSubmit} autoComplete="off">
      <Field label="Login:" {...login.props} />
      <Field label="Password:" {...password.props} />
      <Field label="Repeat password:" {...passwordRepeat.props} />
      <Field label="Surname:" {...surname.props} />
      <Field label="Name:" {...name.props} />
      <Field label="Patronymic:" {...patronymic.props} />
      <Select
        className={cn('role')}
        options={roles}
        value={selectedRole}
        onChange={handleSelectChange}
      />
      <Spinner className={cn('masterSpinner')} visible={isMasterOptionsLoading} />
      <Button className={cn('submit')} type="submit">Register</Button>
      <Link className={cn('login navlink')} to="/login">Login</Link>
      <Spinner className={cn('spinner')} visible={isLoading} />
    </form>
  );
};
