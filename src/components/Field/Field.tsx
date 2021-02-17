import React from 'react';

export const Field = ({
  value,
  onChange,
  type = 'text',
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="field">
    <input type={type} value={value} onChange={onChange} />
  </div>
);
