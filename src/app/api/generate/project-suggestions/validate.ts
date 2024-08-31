import { z } from 'zod';

export const FormDataSchema = z.object({
  'task-complexity-0-to-100': z.coerce.number().min(0).max(100),
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
        const techArray = value.split(',').map(s => s.trim()).filter(Boolean);
        return techArray.length > 0 ? techArray : [];
      }
    }
    return Array.isArray(value) ? value.filter(Boolean) : [];
  }, z.array(z.string()))
});

export const validate = (formData: FormData) => {
  const formDataObject: Record<string, unknown> = {};

  for (const [key, value] of formData.entries()) {
    formDataObject[key] = value;
  }

  FormDataSchema.parse(formDataObject);
};