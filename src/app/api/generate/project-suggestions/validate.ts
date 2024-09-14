import { z, ZodError } from 'zod';
import { formDataToObject } from '@/scripts/formDataToObject';

export const FormDataSchema = z.object({
  taskComplexity: z.coerce.number().min(0).max(100),
  stack: z.string().min(7),
  technologies: z.preprocess((value) => {
    if (typeof value === 'string') {
      try {
        const parsedValue = JSON.parse(value);

        // If it's an array, return it filtered
        if (Array.isArray(parsedValue)) {
          return parsedValue.filter(Boolean);
        }

        // If it's not an array, treat it as a single technology
        return [parsedValue.toString()];
      } catch (error) {
        // If parsing fails, fall back to splitting the string
        const techArray = value.split(',').map((s) => s.trim()).filter(Boolean);
        return techArray.length > 0 ? techArray : [];
      }
    }
    return Array.isArray(value) ? value.filter(Boolean) : [];
  }, z.array(z.string()).min(0)),
  note: z.string().nullable()
});

export interface FormDataObject {
  taskComplexity: string;
  stack: string;
  technologies: string[];
  note: string;
}

type ValidateResponse = { formDataObject: FormDataObject } | { error: ZodError | string }

export const validate = (formData: FormData): ValidateResponse => {
  const formDataObject = formDataToObject(formData);

  try {
    FormDataSchema.parse(formDataObject);
  } catch (e) {
    if (e instanceof ZodError) {
      return { error: e };
    }

    // Handle other types of errors
    console.error('Unexpected error:', e);
    return { error: 'An unexpected error occurred.' };
  }

  return {
    formDataObject
  };
};