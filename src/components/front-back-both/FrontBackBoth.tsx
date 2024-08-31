import React, { FunctionComponent, useState } from 'react';
import styles from './styles.module.scss';
import Radio from '@/components/radio/Radio';

interface Props {
}

export enum Stack {
  Frontend = 'frontend',
  Backend = 'backend',
  Both = 'fullstack'
}

const FrontBackBoth: FunctionComponent<Props> = () => {
  const [stack, setStack] = useState<Stack>(Stack.Frontend);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value in Stack) {
      setStack(e.target.value);
    }
  };

  return (
    <fieldset>
      <legend>Choose your stack</legend>
      <div className={styles.inputContainer}>
        <Radio name={'stack'} id={Stack.Frontend} label={Stack.Frontend} stack={stack} setStack={setStack}
               handleChange={handleRadioChange} />
        <Radio name={'stack'} id={Stack.Backend} label={Stack.Backend} stack={stack} setStack={setStack}
               handleChange={handleRadioChange} />
        <Radio name={'stack'} id={Stack.Both} label={Stack.Both} stack={stack} setStack={setStack}
               handleChange={handleRadioChange} />
      </div>
    </fieldset>
  );
};

export default FrontBackBoth;