import React, { FunctionComponent } from 'react';
import styles from '@/app/(home)/page.module.scss';
import Checkbox from '@/components/Checkbox';

interface Props {
}

const FrontBack: FunctionComponent<Props> = () => {
  return (
    <fieldset>
      <legend>Choose your stack</legend>
      <div className={styles.checkboxContainer}>
        <Checkbox name={'frontend'} label={'Frontend'} />
        <Checkbox name={'backend'} label={'Backend'} />
      </div>
    </fieldset>
  );
};

export default FrontBack;