'use client';
import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { useProjectSuggestions } from '@/scripts/project/suggestions/useProjectSuggestions';

interface Props {
}

const Projects: FunctionComponent<Props> = () => {
  const { projects } = useProjectSuggestions();

  if (!projects?.length) {
    return null;
  }

  return (
    <section className={styles.container}>
      {projects.map((project) => (
        <div className={styles.project} key={project.title}>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.description}>{project.description}</p>
        </div>
      ))}
    </section>
  );
};

export default Projects;