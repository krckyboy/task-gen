'use client';
import { useContext } from 'react';
import { StepsContext } from './StepsContext';

export interface UseLoadingResult {
  step: number;
  setStep: (step: number) => void;
}

export const useSteps = (): UseLoadingResult => {
  const context = useContext(StepsContext);
  if (context === undefined) {
    throw new Error('This hook must be used within its provider');
  }
  return context;
};
