"use server";
import { generateObject } from 'ai';
import { mistral } from "@ai-sdk/mistral";
import { z } from 'zod';


export const generateHashtags = async (topic: string, tone: string, style: string) => {
  if (!topic || !tone || !style) {
    throw new Error("Invalid parameters: topic, tone, and style are required.");
  }

  try {
    const result = await generateObject({
      model: mistral('mistral-large-latest'),
      schema: z.array(
        z.object({
          hashtags: z.array(z.string()).describe("List of 5–10 relevant hashtags for the topic"),
        })
      ),
      prompt: `
Generate 5–10 relevant hashtags for social media posts about "${topic}".
The hashtags should match a ${tone} tone and ${style} style.
Make them creative, catchy, and suitable for engagement.
      `,
    });

    return {
      status: 201,
      message: "Hashtags generated successfully",
      hashtags: result.object,
    };
  } catch (error) {
    console.error("Error generating hashtags:", error);
    return {
      status: 500,
      message: "Error occurred in generate hashtags component!",
      hashtags: [],
    };
  }
};  