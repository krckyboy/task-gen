import React, { FunctionComponent } from 'react';
import styles from '@/components/form/collapsed/styles.module.scss';
import Image from 'next/image';

interface Props {
  setCollapsed: (collapsed: boolean) => void;
  collapsed: boolean;
}

const ShowForm: FunctionComponent<Props> = ({ setCollapsed, collapsed }) => {
  if (!collapsed) {
    return null;
  }

  return (
    <button className={styles.button} onClick={() => setCollapsed(!collapsed)}>
      <span>Show Form</span>
      <Image alt={'Arrow pointing down'}
             width={16}
             height={16}
             src={'/images/arrow-down.svg'}
      />
    </button>
  );
};

export default ShowForm;