"use server";
import { generateObject } from 'ai';
import { mistral } from "@ai-sdk/mistral";
import { z } from 'zod';

interface AdData {
  industry: string;
  products: string[];
  services: string[];
  features: string;
  targetAudience: string;
  benefits: string;
  region: string;
}

interface Ad {
  script: string;
  hooks: string[];
  platform: string;
}

export const generateAdIdeas = async (
  data: AdData,
  tone: string,
  style: string
) => {
  const { industry, products, services, features, targetAudience, benefits, region } = data;

  if (!industry || !tone || !style) {
    throw new Error("Invalid parameters: industry, tone, and style are required.");
  }

  const platforms = ["Instagram", "Twitter", "Facebook", "LinkedIn", "TikTok"];

  try {
    const result = await generateObject({
      model: mistral('mistral-large-latest'),
      schema: z.object({
        ads: z.array(
          z.object({
            platform: z.string(),
            script: z.string(),
            hooks: z.array(z.string()),
          })
        )
      }),
      prompt: `
Generate ${platforms.length} ad ideas for social media posts about a business in the ${industry} industry.
Products: ${products.join(", ")}
Services: ${services.join(", ")}
Features: ${features}
Benefits: ${benefits}
Target audience: ${targetAudience}
Region: ${region}

Tone: ${tone}
Style: ${style}

Distribute one ad per platform from: ${platforms.join(", ")}. Each ad should include:
- Platform
- Script: full ad copy or video/audio script
- Hooks: catchy lines or attention-grabbing phrases
Make the ads engaging, creative, and suitable for the respective platform.
      `,
    });

    // Always normalize to a fixed JSON shape
    const adIdeasPayload = {
      ads: Array.isArray(result.object?.ads) ? result.object.ads : [],
    };

    return {
      status: 201,
      message: "Ad ideas generated successfully",
      adIdeas: adIdeasPayload, // <- Prisma-safe shape
    };
  } catch (error) {
    console.error("Error generating ad ideas:", error);
    return {
      status: 500,
      message: "Error occurred while generating ad ideas!",
      adIdeas: { ads: [] }, // <- still Prisma-safe
    };
  }
};
