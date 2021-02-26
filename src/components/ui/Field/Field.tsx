import React from 'react';
import './style.css';

type PropsType = {
  label: string
  error?: string
  type?: 'text' | 'password',
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Field = ({
  value,
  onChange,
  type = 'text',
  name,
  error = '',
  label,
  className,
  ...inputProps
}: PropsType) => (
  <div className={`field ${className || ''}`}>
    <label className="field__label" htmlFor={name}>{label}</label>
    <input
      className="field__input"
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      {...inputProps}
    />
    <div className="field__error">{error}</div>
  </div>
);
