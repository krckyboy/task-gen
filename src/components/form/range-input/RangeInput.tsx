import React, { FunctionComponent, useCallback, useState } from 'react';
import styles from './styles.module.scss';

interface Props {
  name: string;
  label: string;
}

const RangeInput: FunctionComponent<Props> = ({ name, label }) => {
  const [value, setValue] = useState(50);
  const [style, setStyle] = useState({
    background: `linear-gradient(to right, #DC5F00 ${50}%, #373A40 ${50}%)`
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setValue(newValue);

    const progress = (newValue / 100) * 100;

    setStyle({
      background: `linear-gradient(to right, #DC5F00 ${String(progress)}%, #373A40 ${String(progress)}%)`
    });
  }, []);

  return (
    <>
      <label htmlFor={name}>
        <span>{label}</span>
        <span>{value}</span>
        <input onChange={handleChange}
               className={styles.input}
               id={name}
               name={name}
               type={'range'}
               style={style}
        />
      </label>
    </>
  );
};

export default RangeInput;