import { NextRequest } from 'next/server';
import { generateTasks } from '@/app/api/project-suggestions/generateTask';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is required.');
    }

    const formData = await request.formData();
    const completionResult = await generateTasks(formData);

    // Return the completion result as a JSON response
    return new Response(completionResult, {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    console.error(e);

    return new Response(JSON.stringify({ error: 'Failed to generate completion.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
