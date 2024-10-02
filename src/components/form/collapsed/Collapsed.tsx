import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { useProjectSuggestions } from '@/scripts/project/suggestions/useProjectSuggestions';
import { useLoading } from '@/scripts/loading/useLoading';
import ShowForm from '@/components/form/collapsed/show-form/ShowForm';
import CollapseForm from '@/components/form/collapsed/collapse-form/CollapseForm';

interface Props {
  setCollapsed: (collapsed: boolean) => void;
  collapsed: boolean;
}

const Collapsed: FunctionComponent<Props> = ({ setCollapsed, collapsed }) => {
  const { projects } = useProjectSuggestions();
  const { isLoading } = useLoading();

  const show = projects?.length || isLoading;

  return (
    <div className={`${styles.container} ${!collapsed ? styles.shown : ''} ${show ? styles.show : ''}`}>
      <ShowForm setCollapsed={setCollapsed} collapsed={collapsed} />
      <CollapseForm setCollapsed={setCollapsed} collapsed={collapsed} />
    </div>
  );
};

export default Collapsed;