import React from 'react';
import './style.css';

type PropsType = {
  label: string
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Field = ({
  value,
  onChange,
  type = 'text',
  name,
  label,
  ...inputProps
}: PropsType) => (
  <div className="field">
    <label className="field__label" htmlFor={name}>{label}</label>
    <input
      className="field__input"
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      {...inputProps}
    />
  </div>
);
