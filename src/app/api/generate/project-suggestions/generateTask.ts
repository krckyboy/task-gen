import { z } from 'zod';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Define the schema for the expected form data
const FormDataSchema = z.object({
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

interface GeneratedProject {
  name: string;
  description: string;
}

export interface TaskGenerationResult {
  projects: GeneratedProject[];
}

export async function generateTasks(inputData: z.infer<typeof FormDataSchema>): Promise<string> {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Your task is to generate 3 project previews based on the provided criteria. 
                     Generate projects suitable for developers of different experience levels. 
                     Provide a brief description for each project. 
                     Format the output as JSON with a "projects" property containing an array of objects.
                     Each object should have "id", "name", and "description" properties.`
        },
        {
          role: 'user',
          content: `Form Data: ${JSON.stringify(inputData)}`
        }
      ],
      model: 'gpt-4o-mini'
    });

    const completionResult = chatCompletion?.choices?.[0]?.message?.content;
    if (!completionResult) {
      throw new Error('Chat completion did not return a valid result.');
    }

    return completionResult;
  } catch (error) {
    console.error('Error generating tasks:', error);
    throw error;
  }
}