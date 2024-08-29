'use client';
import Heading from '@/app/(home)/_components/heading/Heading';
import Form from '@/components/form/Form';
import { useState } from 'react';
import { useLoading } from '@/scripts/loading/useLoading';

export default function Home() {
  const [step, setStep] = useState(0);
  const { isLoading } = useLoading();

  return (
    <main>
      {isLoading && (
        <p>Loading...</p>
      )}
      <Heading />
      <Form />
    </main>
  );
}
