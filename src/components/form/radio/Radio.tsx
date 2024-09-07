'use client';
import React, { FunctionComponent, useRef } from 'react';
import styles from './radio.module.scss';
import { Stack } from '@/components/form/front-back-both/FrontBackBoth';

interface Props {
  name: string;
  label: string;
  id: Stack;
  stack: Stack;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio: FunctionComponent<Props> = ({ name, label, id, stack, handleChange }) => {
  const checked = stack === id;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (inputRef.current && 'click' in inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <label htmlFor={name} className={`${styles.container} ${checked ? styles.active : ''}`} onClick={handleClick}>
      <span>{label}</span>
      <input type={'radio'}
             className={checked ? styles.active : ''}
             name={name}
             id={id}
             value={id}
             onChange={handleChange}
             checked={checked}
             ref={inputRef}
      />
    </label>
  );
};

export default Radio;