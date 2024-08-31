import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface GeneratedProject {
  name: string;
  description: string;
}

export interface TaskGenerationResult {
  projects: GeneratedProject[];
}

export async function generateTasks(formData: FormData): Promise<string> {
  try {
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
          'content': `Form Data: ${JSON.stringify(formData)}`
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