"use server";
import { generateObject } from 'ai';
import { mistral } from "@ai-sdk/mistral";
import { z } from 'zod';
import prisma from '@/lib/prisma';


export const generateLogoIdeas = async (name: string, style: string, tone: string) => {
    if (!name || !style || !tone) {
        throw new Error("Invalid parameters: name, style, and tone are required.");
    }
    try {
  const result = await generateObject({
    model: mistral('mistral-large-latest'),
    schema: z.array(
      z.object({
        logo: z.object({
          title: z.string(),
          colors: z.tuple([z.string(), z.string(), z.string()]).describe("3 colors for the logo palette"),
        }),
      })
    ),
    prompt: `Generate 5 logo ideas for a business named "${name}" in a ${tone} tone and ${style} style.`,
  });
    
  return {
    status:201,
    message:"Logos generated successfully",
    logos:result.object
  } 
  } catch (error) {
    return {
        status:500,
        message:"Error occured in generate logo component!"
    }
  }

};
