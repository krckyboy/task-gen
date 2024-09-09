'use client';
import React, { FunctionComponent, useState } from 'react';
import styles from '@/components/form/styles.module.scss';
import RangeInput from '@/components/form/range-input/RangeInput';
import Input from '@/components/form/input/Input';
import FrontBackBoth from '@/components/form/front-back-both/FrontBackBoth';
import Technologies from '@/components/form/technologies/Technologies';
import { useLoading } from '@/scripts/loading/useLoading';
import { TaskGenerationResult } from '@/app/api/generate/project-suggestions/generateTask';
import { validate } from '@/app/api/generate/project-suggestions/validate';
import { useProjectSuggestions } from '@/scripts/project/suggestions/useProjectSuggestions';
import { ZodError } from 'zod';
import Collapsed from '@/components/form/collapsed/Collapsed';

interface Props {
}

const Form: FunctionComponent<Props> = () => {
  const { setIsLoading } = useLoading();
  const { setProjects } = useProjectSuggestions();
  const [collapsed, setCollapsed] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const { error } = validate(formData);

      if (error && error instanceof ZodError) {
        const e = error as ZodError;
        console.log(e.formErrors.fieldErrors);
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
      setCollapsed(true);
    } catch (error) {
      setIsLoading(false);
      // @todo Add proper error handling
      console.error('Error:', error);
    }
  };

  return (
    <>
      <form className={`${styles.form} ${collapsed ? styles.collapsed : ''}`} onSubmit={handleSubmit}>
        <RangeInput name={'task-complexity-0-to-100'} label={'Task Complexity'} />
        <Technologies />
        <Input name={'note'} label={'Note'} type={'text'} placeholder={'Generate projects about books'} />
        <FrontBackBoth />
        <button type={'submit'}>Generate</button>
      </form>
      <Collapsed setCollapsed={setCollapsed} collapsed={collapsed} />
    </>
  );
};

export default Form;