import React, { FunctionComponent } from 'react';
import { getCurrentComplexity } from '@/components/form/range-input/RangeInput';
import { FormDataObject } from '@/app/api/generate/project-suggestions/validate';
import styles from './styles.module.scss';

interface Props {
  formDataState: FormDataObject;
}

const ShowingResults: FunctionComponent<Props> = ({ formDataState }) => {
  const taskComplexity = getCurrentComplexity(Number(formDataState?.taskComplexity));
  return (
    <div className={styles.container}>
      <h2 className={styles.plainText}>Suggested Projects</h2>
      <div className={styles.tagsContainer}>
        <span className={`${styles.complexity} ${styles.tag}`}>{taskComplexity}</span>
        <span className={`${styles.tag} ${styles.stack}`}>{formDataState.stack}</span>
        {formDataState.note && (
          <span className={`${styles.tag} ${styles.note}`}>{formDataState.note}</span>
        )}
        <div className={styles.tagsContainer}>
          {formDataState?.technologies.map((technology) => (
            <span className={styles.tag} key={technology}>{technology}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowingResults;