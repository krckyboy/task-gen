import React, { FunctionComponent, useCallback, useState } from 'react';
import styles from './styles.module.scss';

interface Props {
  name: string;
  label: string;
}

export enum ComplexityLevel {
  Beginner = 25,
  Intermediate = 50,
  Advanced = 75,
  Expert = 100,
}

const RangeInput: FunctionComponent<Props> = ({ name, label }) => {
  const [value, setValue] = useState(ComplexityLevel.Intermediate);
  const [style, setStyle] = useState({
    background: `linear-gradient(to right, #DC5F00 ${66.66}%, #373A40 ${66.66}%)`
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setValue(newValue);

    const progress = (newValue / 100) * 100;

    setStyle({
      background: `linear-gradient(to right, #DC5F00 ${String(progress)}%, #373A40 ${String(progress)}%)`
    });
  }, []);

  const getCurrentComplexity = (value: number): string => {
    if (value < ComplexityLevel.Beginner) return 'Beginner';
    if (value < ComplexityLevel.Intermediate) return 'Intermediate';
    if (value < ComplexityLevel.Advanced) return 'Advanced';
    return 'Expert';
  };

  return (
    <>
      <label htmlFor={name}>
        <span>{label}</span>
        <span className={styles.complexityValueLabel}>{getCurrentComplexity(value)}</span>
        <input onChange={handleChange}
               className={styles.input}
               id={name}
               name={name}
               type={'range'}
               style={style}
               step={33.33}
        />
        <div className={styles.sliderTicks}>
          {Array.from({ length: 4 }, (_, i) => <span className={styles.tick} key={i}></span>)}
        </div>
      </label>
    </>
  );
};

export default RangeInput;