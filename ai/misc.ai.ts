"use server";
import { generateObject } from 'ai';
import { mistral } from "@ai-sdk/mistral";
import { z } from 'zod';

interface Persona {
  name: string;
  ageRange: string;
  occupation: string;
  interests: string[];
  goals: string[];
  challenges: string[];
}

interface BrandKitData {
  industry: string;
  products: string[];
  services: string[];
  features: string;
  targetAudience: string;
  benefits: string;
  region: string;
  tone: string;
  style: string;
}

interface BrandKit {
  personas: Persona[];
  brandIdentity: string;        
  businessDescriptions: string; 
  socialMediaStrategy: string; 
}

export const generateBrandKit = async (data: BrandKitData) => {
  const { industry, products, services, features, targetAudience, benefits, region, tone, style } = data;

  if (!industry || !tone || !style) {
    throw new Error("Invalid parameters: industry, tone, and style are required.");
  }

  try {
    const result = await generateObject({
      model: mistral("mistral-large-latest"),
      schema: z.object({
        brandKit: z.object({
            personas: z.array(
                z.object({
                  name: z.string(),
                  ageRange: z.string(),
                  occupation: z.string(),
                  interests: z.array(z.string()),
                  goals: z.array(z.string()),
                  challenges: z.array(z.string())
                })
              ),              
          brandIdentity: z.string().describe(
            "Exactly 3 lines separated by \\n"
          ),
          businessDescription: z.string().describe(
            "Exactly 3 lines separated by \\n"
          ),
          socialMediaStrategy: z.string().describe("Summary of social media strategy for the brand")
        })
      }),
      prompt: `
Generate a complete brand kit for a business in the ${industry} industry.

Products: ${products.join(", ")}
Services: ${services.join(", ")}
Features: ${features}
Benefits: ${benefits}
Target Audience: ${targetAudience}
Region: ${region}

Tone: ${tone}
Style: ${style}

The brand kit should include:
1. An array of 3–5 personas, each with:
   - Name
   - Age range
   - Occupation
   - Interests
   - Goals
   - Challenges
2. Brand identity in 3 concise lines
3. Business descriptions in 3 short lines
4. Social media strategy summary

Return the output in structured JSON with all these fields.
      `
    });

    return {
      status: 201,
      message: "Brand kit generated successfully",
      brandKit: result.object.brandKit
    };
  } catch (error) {
    console.error("Error generating brand kit:", error);
    return {
      status: 500,
      message: "Error occurred while generating brand kit!",
      brandKit: null
    };
  }
};
