'use client';
import React, { FunctionComponent, useState } from 'react';
import styles from '@/components/form/styles.module.scss';
import RangeInput from '@/components/form/range-input/RangeInput';
import Note from '@/components/form/note/Note';
import FrontBackBoth from '@/components/form/front-back-both/FrontBackBoth';
import Technologies from '@/components/form/technologies/Technologies';
import { useLoading } from '@/scripts/loading/useLoading';
import { TaskGenerationResult } from '@/app/api/generate/project-suggestions/generateTask';
import { FormDataObject, validate } from '@/app/api/generate/project-suggestions/validate';
import { useProjectSuggestions } from '@/scripts/project/suggestions/useProjectSuggestions';
import { ZodError } from 'zod';
import Collapsed from '@/components/form/collapsed/Collapsed';
import { formDataToObject } from '@/scripts/formDataToObject';
import ShowingResultsFor from '@/components/showingResultsFor/ShowingResultsFor';

interface Props {
}

const Form: FunctionComponent<Props> = () => {
  const { setIsLoading, isLoading } = useLoading();
  const { setProjects, projects } = useProjectSuggestions();
  const [collapsed, setCollapsed] = useState(false);
  const [formDataState, setFormDataState] = useState<FormDataObject | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const { error } = validate(formData as FormData);

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
      setFormDataState(formDataToObject(formData));
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
        <RangeInput name={'taskComplexity'} label={'Task Complexity'} />
        <Technologies />
        <Note name={'note'} label={'Note'} type={'text'} placeholder={'Generate projects about books'} />
        <FrontBackBoth />
        <button disabled={isLoading} type={'submit'}>Generate</button>
      </form>
      <Collapsed setCollapsed={setCollapsed} collapsed={collapsed} />
      {projects?.length && formDataState && (
        <ShowingResultsFor formDataState={formDataState} />
      )}
    </>
  );
};

export default Form;