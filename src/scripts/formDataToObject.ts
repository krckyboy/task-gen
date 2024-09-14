import { FormDataObject } from '@/app/api/generate/project-suggestions/validate';

export const formDataToObject = (formData): FormDataObject => {
  const formDataObject: FormDataObject | {} = {};

  for (const [key, value] of formData.entries()) {
    if (key === 'technologies') {
      formDataObject[key] = JSON.parse(value);
      continue;
    }

    formDataObject[key] = value;
  }

  return formDataObject as FormDataObject;
};