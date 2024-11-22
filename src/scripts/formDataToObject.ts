import { FormDataObject } from '@/app/api/project-suggestions/validate';

export const formDataToObject = (formData: FormData): FormDataObject => {
  const formDataObject: Partial<Record<string, unknown>> & Partial<FormDataObject> = {};

  for (const [key, value] of formData.entries()) {
    if (key === 'technologies' && typeof value === 'string') {
      formDataObject[key] = JSON.parse(value);
      continue;
    }

    formDataObject[key] = value;
  }

  return formDataObject as FormDataObject;
};