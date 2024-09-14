import OpenAI from 'openai';
import { validate } from '@/app/api/generate/project-suggestions/validate';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export interface GeneratedProject {
  title: string;
  description: string;
}

export interface TaskGenerationResult {
  projects: GeneratedProject[];
}

export async function generateTasks(formData: FormData): Promise<string> {
  try {
    const { formDataObject } = validate(formData);
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          'role': 'system',
          'content': `Your task is to generate a task/project based on the provided criteria as you are to help developers of different experience to come up with something to work on. 
          Generate up to 10 projects (if you are out of good ideas, you can generate less than 10) with a preview of description, so on the next step they will choose one of the options so you can continue generating it all. 
          Just straight to the point, and let the response by in JSON, so I can just JSON.parse it easily in the API, so no need for MD, just stringified JSON. 
          The projects should be generated in a way so that they are suited for the technologies provided to you.
          In the description, don't focus so much on the technologies, focus more on what the apps are about in a general manner, what does it do and how it helps its users, but also make sure so you DO mention how technologies come in the play.
          Make sure to pay attention to complexity of the project, since it goes like: beginner: 0-25; intermediate: 26-50; advanced: 51-75; expert: 76-100.
          Also, return the data in the format of an object with projects property. It should have description and title property.`
        },
        {
          'role': 'user',
          'content': `Form Data: ${JSON.stringify(formDataObject)}`
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