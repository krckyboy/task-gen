import OpenAI from 'openai';
import { validate } from '@/app/api/project-suggestions/validate';

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
          'content': `
          Your task is to generate a task/project based on the provided criteria as you are to help developers of 
          different experience to come up with something to work on. 
          
          Generate no more than 5 projects with a preview of description, but you can generate less if it makes sense. Quality over quantity.
          
          Let the response by in JSON, so I can just JSON.parse it easily in the API, so no need for MD, just stringified JSON. 
          
          The projects should be generated in a way so that they are suited for the technologies provided to you.
          
          In the description, don't focus so much on the technologies, focus more on what the apps are about in a general manner, 
          as if you are explaining it to a project manager - what does it do and how it helps its users,
          but also make sure so you take into account that technologies mentioned are suited for the project.
          
          Make sure to use simple words so it's really easy to understand.
          
          Make sure to pay attention to the complexity of the project, since it goes like: beginner: 0-25; 
          intermediate: 26-50; advanced: 51-75; expert: 76-100.
          
          Also, return the data in the format of an object with projects property. It should have description and title property.
          `
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