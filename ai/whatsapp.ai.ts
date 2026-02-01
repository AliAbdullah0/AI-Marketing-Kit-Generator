"use server";
import { generateObject } from 'ai';
import { mistral } from "@ai-sdk/mistral";
import { z } from 'zod';

interface WhatsAppMessageData {
  industry: string;
  products: string[];
  services: string[];
  features: string;
  targetAudience: string;
  benefits: string;
  region: string;
}

interface WhatsAppMessage {
  message: string;
  hook: string; // attention-grabbing start of the message
}

export const generateWhatsAppMessages = async (
  data: WhatsAppMessageData,
  tone: string,
  style: string
) => {
  const { industry, products, services, features, targetAudience, benefits, region } = data;

  if (!industry || !tone || !style) {
    throw new Error("Invalid parameters: industry, tone, and style are required.");
  }

  try {
    const result = await generateObject({
      model: mistral('mistral-large-latest'),
      schema: z.array(
        z.object({
          whatsappMessage: z.object({
            message: z.string().describe("Full WhatsApp message content for the customer"),
            hook: z.string().describe("Attention-grabbing opening line for the message"),
          }),
        })
      ),
      prompt: `
Generate 10 WhatsApp messages for customers about a business in the ${industry} industry.
Products: ${products.join(", ")}
Services: ${services.join(", ")}
Features: ${features}
Benefits: ${benefits}
Target audience: ${targetAudience}
Region: ${region}

Tone: ${tone}
Style: ${style}

Each message should:
- Be concise and conversational (suitable for WhatsApp)
- Include a hook at the beginning to grab attention
- Highlight products, services, features, or benefits
- Be persuasive but friendly and engaging
Return the output as a list of 10 messages with their hooks.
      `,
    });

    return {
      status: 201,
      message: "WhatsApp messages generated successfully",
      messages: result.object.map(item => item.whatsappMessage),
    };
  } catch (error) {
    console.error("Error generating WhatsApp messages:", error);
    return {
      status: 500,
      message: "Error occurred while generating WhatsApp messages!",
      messages: [],
    };
  }
};
