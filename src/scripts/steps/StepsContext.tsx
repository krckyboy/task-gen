'use client';
import React, { createContext, useState, ReactNode } from 'react';

interface StepsContextType {
  step: number;
  setStep: (step: number) => void;
}

export const StepsContext = createContext<StepsContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export const StepsProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [step, setStep] = useState(1);

  return (
    <StepsContext.Provider value={{ step, setStep }}>
      {children}
    </StepsContext.Provider>
  );
};
