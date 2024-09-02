'use client'
import { useContext } from 'react';
import { LoadingContext } from './LoadingContext';

export interface UseLoadingResult {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useLoading = (): UseLoadingResult => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('This hook must be used within its provider');
  }
  return context;
};
