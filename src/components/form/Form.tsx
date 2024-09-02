import React, { FunctionComponent } from 'react';
import styles from '@/components/form/styles.module.scss';
import RangeInput from '@/components/RangeInput';
import Input from '@/components/Input';
import FrontBackBoth from '@/components/front-back-both/FrontBackBoth';
import Technologies from '@/components/technologies/Technologies';
import { useLoading } from '@/scripts/loading/useLoading';
import { TaskGenerationResult } from '@/app/api/generate/project-suggestions/generateTask';
import { validate } from '@/app/api/generate/project-suggestions/validate';
import { useProjectSuggestions } from '@/scripts/project/suggestions/useProjectSuggestions';
import { useSteps } from '@/scripts/steps/useSteps';
import { ZodError } from 'zod';

interface Props {
}

const Form: FunctionComponent<Props> = ({}) => {
  const { setIsLoading } = useLoading();
  const { setProjects } = useProjectSuggestions();
  const { setStep } = useSteps();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const { error } = validate(formData);

      if (error && error instanceof ZodError) {
        const e = error as ZodError;
        // Handle errors
        console.log(e.formErrors.fieldErrors);
        console.log(error);
        return;
      }
      setIsLoading(true);

      const response = await fetch('/api/generate/project-suggestions', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        console.error(response);
        throw new Error('Failed to generate task');
      }

      const data: TaskGenerationResult = await response.json();
      setIsLoading(false);
      setProjects(data.projects);
      setStep(2);
    } catch (error) {
      setIsLoading(false);
      // @todo Add proper error handling
      console.error('Error:', error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <RangeInput name={'task-complexity-0-to-100'} label={'Task Complexity'} />
      <Technologies />
      <Input name={'note'} label={'Note'} type={'text'} />
      <FrontBackBoth />
      <button type={'submit'}>Generate</button>
    </form>
  );
};

export default Form;