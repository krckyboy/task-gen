import React, { FunctionComponent } from 'react';
import { getCurrentComplexity } from '@/components/form/range-input/RangeInput';
import { FormDataObject } from '@/app/api/generate/project-suggestions/validate';
import styles from './styles.module.scss';

interface Props {
  formDataState: FormDataObject;
}

const ShowingResultsFor: FunctionComponent<Props> = ({ formDataState }) => {
  const taskComplexity = getCurrentComplexity(Number(formDataState?.taskComplexity));
  return (
    <>
      <p className={styles.plainText}>Showing results for:</p>
      <div className={styles.tagsContainer}>
        <span className={`${styles.complexity} ${styles.tag}`}>{taskComplexity}</span>
        <span className={`${styles.tag} ${styles.stack}`}>{formDataState.stack}</span>
        {formDataState?.technologies.map((technology) => (
          <span className={styles.tag} key={technology}>{technology}</span>
        ))}
      </div>
    </>
  );
};

export default ShowingResultsFor;