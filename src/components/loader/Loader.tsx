'use client';
import React, { FunctionComponent } from 'react';
import { useLoading } from '@/scripts/loading/useLoading';
import styles from './styles.module.scss';

interface Props {
}

const Loader: FunctionComponent<Props> = () => {
  const { isLoading } = useLoading();

  return (
    <div className={`${styles.container} ${isLoading ? styles.active : ''}`}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loader;