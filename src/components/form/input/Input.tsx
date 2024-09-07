import React, { FunctionComponent } from 'react';

interface Props {
  name: string;
  label: string;
  type?: string;
}

const Input: FunctionComponent<Props> = ({ name, label, type }) => {
  return (
    <>
      <label htmlFor={name}>
        <span>{label}</span>
        <input id={name} name={name} type={type ?? 'text'} />
      </label>
    </>
  );
};

export default Input;