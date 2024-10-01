'use client';
import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { useProjectSuggestions } from '@/scripts/project/suggestions/useProjectSuggestions';
import { useLoading } from '@/scripts/loading/useLoading';

interface Props {
}

const Projects: FunctionComponent<Props> = () => {
  const { projects } = useProjectSuggestions();
  const { isLoading } = useLoading();

  return (
    <section className={styles.container}>
      {!isLoading && projects?.length && (
        projects.map((project) => (
          <div className={styles.project} key={project.title}>
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.description}>{project.description}</p>
          </div>
        ))
      )}
      {isLoading && Array.from({ length: 5 }).map((_, index) => (
        <div className={styles.skeletonProject} key={index}>
          <h3 className={styles.skeletonTitle}></h3>
          <p className={styles.skeletonDescription}></p>
        </div>
      ))}
    </section>
  );
};

export default Projects;