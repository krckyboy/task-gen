import React, { FunctionComponent } from 'react';

interface Props {
  name: string;
  label: string;
}

const RangeInput: FunctionComponent<Props> = ({ name, label }) => {
  return (
    <>
      <label htmlFor={name}>
        <span>{label}</span>
        <input id={name} name={name} type={'range'} />
      </label>
    </>
  );
};

export default RangeInput;