'use client';
import { useContext } from 'react';
import { ProjectSuggestionsContext } from './ProjectSuggestionsContext';
import { GeneratedProject } from '@/app/api/project-suggestions/generateTask';

export interface UseProjectSuggestionsResult {
  projects: GeneratedProject[] | null;
  setProjects: (projects: GeneratedProject[]) => void;
}

export const useProjectSuggestions = (): UseProjectSuggestionsResult => {
  const context = useContext(ProjectSuggestionsContext);
  if (context === undefined) {
    throw new Error('This hook must be used within its provider');
  }
  return context;
};
