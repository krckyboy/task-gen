import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import { useProjectSuggestions } from '@/scripts/project/suggestions/useProjectSuggestions';

interface Props {
  setCollapsed: (collapsed: boolean) => void;
  collapsed: boolean;
}

const Collapsed: FunctionComponent<Props> = ({ setCollapsed, collapsed }) => {
  const { projects } = useProjectSuggestions();
  const show = projects?.length;

  return (
    <div className={`${styles.container} ${!collapsed ? styles.shown : ''} ${show ? styles.show : ''}`}>
      {collapsed ?
        <button className={styles.button} onClick={() => setCollapsed(!collapsed)}>
          <span>Show Form</span>
          <Image alt={'Arrow pointing down'}
                 width={16}
                 height={16}
                 src={'/images/arrow-down.svg'}
          />
        </button>
        :
        <button className={styles.button} onClick={() => setCollapsed(!collapsed)}>
          <span>Collapse Form</span>
          <Image alt={'Arrow pointing up'}
                 width={16}
                 height={16}
                 src={'/images/arrow-down.svg'}
                 className={styles.toCollapseForm}
          />
        </button>
      }
    </div>
  );
};

export default Collapsed;