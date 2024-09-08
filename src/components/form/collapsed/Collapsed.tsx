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
  const text = collapsed ? 'Show Form' : 'Hide Form';
  const show = projects?.length;

  return (
    <div className={`${styles.container} ${show ? styles.show : ''}`}>
      <button className={styles.button} onClick={() => setCollapsed(!collapsed)}>
        <span>{text}</span>
        <Image alt={'Arrow pointing down'}
               width={16}
               height={16}
               src={'/images/arrow-down.svg'}
               className={!collapsed ? styles.invert : ''}
        />
      </button>
    </div>
  );
};

export default Collapsed;