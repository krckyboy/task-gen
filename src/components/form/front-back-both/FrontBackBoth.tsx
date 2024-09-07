import React, { FunctionComponent, useState } from 'react';
import styles from './styles.module.scss';
import Radio from '@/components/form/radio/Radio';

interface Props {
}

export enum Stack {
  Frontend = 'frontend',
  Backend = 'backend',
  Both = 'fullstack'
}

const FrontBackBoth: FunctionComponent<Props> = () => {
  const [stack, setStack] = useState<Stack>(Stack.Both);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value as Stack;

    if (Object.values(Stack).includes(newValue)) {
      setStack(newValue);
    }
  };

  return (
    <fieldset>
      <legend>Choose your stack</legend>
      <div className={styles.inputContainer}>
        <Radio
          name={'stack'}
          id={Stack.Frontend}
          label={Stack.Frontend}
          stack={stack}
          handleChange={handleRadioChange}
        />
        <Radio
          name={'stack'}
          id={Stack.Backend}
          label={Stack.Backend}
          stack={stack}
          handleChange={handleRadioChange}
        />
        <Radio
          name={'stack'}
          id={Stack.Both}
          label={Stack.Both}
          stack={stack}
          handleChange={handleRadioChange}
        />
      </div>
    </fieldset>
  );
};

export default FrontBackBoth;