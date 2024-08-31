import React, { FunctionComponent } from 'react';
import styles from '@/components/form/styles.module.scss';
import RangeInput from '@/components/RangeInput';
import Input from '@/components/Input';
import FrontBackBoth from '@/components/front-back-both/FrontBackBoth';
import Technologies from '@/components/technologies/Technologies';
import { useLoading } from '@/scripts/loading/useLoading';
import { TaskGenerationResult } from '@/app/api/generate/project-suggestions/generateTask';
import { validate } from '@/app/api/generate/project-suggestions/validate';

interface Props {
}

const Form: FunctionComponent<Props> = () => {
  const { setIsLoading } = useLoading();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      if (!formData instanceof FormData) {
        throw new Error('Invalid formData!');
      }

      validate(formData);
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
      console.log('Generated task:', data);
      // Handle success here (e.g., display generated task or redirect)
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error);
      // Handle errors here (e.g., display error message to user)
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