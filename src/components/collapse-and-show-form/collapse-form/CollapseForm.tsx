import React, { FunctionComponent } from 'react';
import styles from '@/components/collapse-and-show-form/styles.module.scss';
import Image from 'next/image';

interface Props {
  setCollapsed: (collapsed: boolean) => void;
  collapsed: boolean;
}

const CollapseForm: FunctionComponent<Props> = ({ setCollapsed, collapsed }) => {
  if (collapsed) {
    return null;
  }

  return (
    <button className={styles.button} onClick={() => setCollapsed(!collapsed)}>
      <span>Collapse Form</span>
      <Image alt={'Arrow pointing up'}
             width={16}
             height={16}
             src={'/images/arrow-down.svg'}
             className={styles.toCollapseForm}
      />
    </button>
  );
};

export default CollapseForm;