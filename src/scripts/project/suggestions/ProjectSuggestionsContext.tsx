'use client';
import React, { createContext, useState, ReactNode } from 'react';
import { GeneratedProject } from '@/app/api/project-suggestions/generateTask';

interface ProjectSuggestionsContextType {
  projects: GeneratedProject[] | null;
  setProjects: (projects: GeneratedProject[]) => void;
}

export const ProjectSuggestionsContext = createContext<ProjectSuggestionsContextType | undefined>(undefined);

interface ProjectSuggestionsProviderProps {
  children: ReactNode;
}

export const ProjectSuggestionsProvider: React.FC<ProjectSuggestionsProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<GeneratedProject[] | null>(null);

  return (
    <ProjectSuggestionsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectSuggestionsContext.Provider>
  );
};
