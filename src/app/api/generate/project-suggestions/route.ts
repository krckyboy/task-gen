import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

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

// Validate OPENAI_API_KEY environment variable
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is required.');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  // Create an object to store form data
  const formDataObject: Record<string, unknown> = {};

  for (const [key, value] of formData.entries()) {
    formDataObject[key] = value;
  }

  try {
    FormDataSchema.parse(formDataObject);

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          'role': 'system',
          'content': `Your task is to generate a task/project based on the provided criteria as you are to help developers of different experience to come up with something to work on. 
          Generate 3 projects with a preview of description, without much details, so on the next step they will choose one of the options so you can continue generating it all. 
          Just straight to the point, and let the response by in JSON, so I can just JSON.parse it easily in the API, so no need for MD, just stringified JSON. 
          The projects should be generated in a way so that they are suited for the technologies provided to you.
          Also, return the data in the format of an object with projects property.`
        },
        {
          'role': 'user',
          'content': `Form Data: ${JSON.stringify(formDataObject)}`
        }
      ],
      model: 'gpt-4o-mini'
    });

    // Safely access the chat completion result
    const completionResult = chatCompletion?.choices?.[0]?.message?.content;
    if (!completionResult) {
      throw new Error('Chat completion did not return a valid result.');
    }

    // Return the completion result as a JSON response
    return new Response(completionResult, {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    console.error(e);
    // Provide a more descriptive error message
    return new Response(JSON.stringify({ error: 'Failed to generate completion.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
