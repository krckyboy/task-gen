import React, { FunctionComponent, ReactNode } from 'react';
import { LoadingProvider } from '@/scripts/loading/LoadingContext';
import { ProjectSuggestionsProvider } from '@/scripts/project/suggestions/ProjectSuggestionsContext';
import { StepsProvider } from '@/scripts/steps/StepsContext';

interface Props {
  children: ReactNode;
}

const Providers: FunctionComponent<Props> = ({ children }) => {
  return (
    <LoadingProvider>
      <ProjectSuggestionsProvider>
        <StepsProvider>
          {children}
        </StepsProvider>
      </ProjectSuggestionsProvider>
    </LoadingProvider>
  );
};

export default Providers;