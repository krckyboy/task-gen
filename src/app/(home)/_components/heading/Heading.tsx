import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';

interface Props {
}

const Heading: FunctionComponent<Props> = () => {
  return (
    <container className={styles.container}>
      <h1>Generate Project</h1>
      <p>Taskify will help you set things up</p>
    </container>
  );
};

export default Heading;