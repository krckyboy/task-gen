'use client';
import React, { FunctionComponent, useState } from 'react';
import styles from '@/components/form/styles.module.scss';
import RangeInput from '@/components/form/range-input/RangeInput';
import Note from '@/components/form/note/Note';
import FrontBackBoth from '@/components/form/front-back-both/FrontBackBoth';
import Technologies from '@/components/form/technologies/Technologies';
import { useLoading } from '@/scripts/loading/useLoading';
import { TaskGenerationResult } from '@/app/api/project-suggestions/generateTask';
import { FormDataObject, validate } from '@/app/api/project-suggestions/validate';
import { useProjectSuggestions } from '@/scripts/project/suggestions/useProjectSuggestions';
import { ZodError } from 'zod';
import { formDataToObject } from '@/scripts/formDataToObject';
import ShowingResults from '@/components/showing-results/ShowingResults';
import ShowForm from '@/components/collapse-and-show-form/show-form/ShowForm';
import CollapseForm from '@/components/collapse-and-show-form/collapse-form/CollapseForm';

interface Props {
}

const Form: FunctionComponent<Props> = () => {
  const { setIsLoading, isLoading } = useLoading();
  const { setProjects, projects } = useProjectSuggestions();
  const [collapsed, setCollapsed] = useState(false);
  const [formDataState, setFormDataState] = useState<FormDataObject | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget) as FormData;

    try {
      const { error } = validate(formData);

      if (error && error instanceof ZodError) {
        const e = error as ZodError;
        console.log(e.formErrors.fieldErrors);
        return;
      }

      setIsLoading(true);
      setFormDataState(formDataToObject(formData));
      setCollapsed(true);

      const response = await fetch('/api/project-suggestions', {
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
        <div>
          <button disabled={isLoading} type={'submit'}>Generate</button>
          {projects?.length && <CollapseForm setCollapsed={setCollapsed} collapsed={collapsed} />}
        </div>
      </form>
      <ShowingResults formDataState={formDataState}
                      showForm={<ShowForm setCollapsed={setCollapsed} collapsed={collapsed} />}
      />
    </>
  );
};

export default Form;