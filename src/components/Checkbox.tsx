import React, { FunctionComponent } from 'react';
import styles from './checkbox.module.scss';

interface Props {
  name: string;
  label: string;
}

const Checkbox: FunctionComponent<Props> = ({ name, label }) => {
  return (
    <label htmlFor={name} className={styles.container}>
      <span>{label}</span>
      <input type={'checkbox'} id={name} />
    </label>
  );
};

export default Checkbox;