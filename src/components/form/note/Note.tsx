import React, { FunctionComponent } from 'react';

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

const Note: FunctionComponent<Props> = ({ name, label, type, placeholder }) => {
  return (
    <>
      <label htmlFor={name}>
        <span>{label}</span>
        <input id={name} name={name} type={type ?? 'text'} placeholder={placeholder} maxLength={120} />
      </label>
    </>
  );
};

export default Note;