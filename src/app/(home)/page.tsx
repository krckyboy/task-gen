'use client';
import Heading from '@/app/(home)/_components/heading/Heading';
import Form from '@/components/form/Form';
import { useLoading } from '@/scripts/loading/useLoading';
import { useProjectSuggestions } from '@/scripts/project/suggestions/useProjectSuggestions';
import { useSteps } from '@/scripts/steps/useSteps';

export default function Home() {
  const { step, setStep } = useSteps();
  const { projects } = useProjectSuggestions();
  const { isLoading } = useLoading();

  return (
    <main>
      {isLoading && (
        <p>Loading...</p>
      )}
      <Heading />
      {step === 1 && (
        <Form />
      )}
      {step > 1 && (
        <button onClick={() => setStep(1)}>Go back</button>
      )}
      {projects?.length && step === 2 && (
        <section>
          {projects.map((project) => (
            <div key={project.title}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
