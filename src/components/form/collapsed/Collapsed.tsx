import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';

interface Props {
  setCollapsed: (collapsed: boolean) => void;
  collapsed: boolean;
}

const Collapsed: FunctionComponent<Props> = ({ setCollapsed, collapsed }) => {
  return (
    <div className={`${styles.container} ${collapsed ? styles.collapsed : ''}`}>
      <button onClick={() => setCollapsed(false)}>Expand Form</button>
    </div>
  );
};

export default Collapsed;