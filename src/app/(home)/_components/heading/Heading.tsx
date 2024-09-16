import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';

interface Props {
}

const Heading: FunctionComponent<Props> = () => {
  return (
    <div className={styles.container}>
      <h1>Generate Your Next Project</h1>
      <p>Fill in the details below, and let our AI suggest the best project for you.</p>
    </div>
  );
};

export default Heading;