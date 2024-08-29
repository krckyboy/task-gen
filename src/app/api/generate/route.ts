import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          'role': 'system',
          'content': 'Your task is to generate a task/project based on the provided criteria as you are to help developers of different experience to come up with something to work on..'
        },
        {
          'role': 'user',
          'content': 'Title: beta. Deadline: 14.10.2024. Seniority: medior. Technology: frontend and backend. Technologies: nextjs'
        }
      ], model: 'gpt-4o-mini'
    });

    return new Response(JSON.stringify(chatCompletion), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    console.error(e);
    throw new Error('Failed to generate completion');
  }
}
