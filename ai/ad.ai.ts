"use server";

import { generateObject, generateText } from "ai";
import { mistral } from "@ai-sdk/mistral";
import { z } from "zod";

/* -------------------- TYPES -------------------- */

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
  platform: "Instagram" | "Twitter" | "Facebook" | "LinkedIn" | "TikTok";
  script: string;
  hooks: string[];
}

/* -------------------- ZOD SCHEMA -------------------- */

// ENUM forces exact platform matching (CRITICAL)
const PlatformEnum = z.enum([
  "Instagram",
  "Twitter",
  "Facebook",
  "LinkedIn",
  "TikTok",
]);

const AdSchema = z.object({
  platform: PlatformEnum,
  script: z.string().min(10),
  hooks: z.array(z.string()).min(1),
});

const AdsSchema = z.array(AdSchema);

/* -------------------- SERVER ACTION -------------------- */

export const generateAdIdeas = async (
  data: AdData,
  tone: string,
  style: string
) => {
  const {
    industry,
    products,
    services,
    features,
    targetAudience,
    benefits,
    region,
  } = data;

  if (!industry || !tone || !style) {
    throw new Error("Invalid parameters: industry, tone, and style are required.");
  }

  try {
    const result = await generateObject({
      model: mistral("mistral-large-latest"),
      schema: AdsSchema,
      prompt: `
Generate EXACTLY 5 ad ideas.

Platforms (each must appear ONCE):
Instagram, Twitter, Facebook, LinkedIn, TikTok

Business details:
Industry: ${industry}
Products: ${products.join(", ")}
Services: ${services.join(", ")}
Features: ${features}
Benefits: ${benefits}
Target Audience: ${targetAudience}
Region: ${region}

Tone: ${tone}
Style: ${style}

Rules:
- Each ad MUST include:
  - platform (exactly one of the platforms above)
  - script (string, full ad copy)
  - hooks (array of short catchy strings)
- Hooks MUST be an array of strings
- No extra fields

IMPORTANT:
Return ONLY valid JSON.
No markdown.
No explanations.
`,
    });

    // SAFETY CHECK (optional but recommended)
    if (!result.object || result.object.length === 0) {
      throw new Error("Structured output validation failed");
    }

    return {
      status: 201,
      message: "Ad ideas generated successfully",
      adIdeas: result.object,
    };
  } catch (error) {
    console.error("Error generating ad ideas:", error);

    return {
      status: 500,
      message: "Error occurred while generating ad ideas!",
      adIdeas: [] as Ad[],
    };
  }
};
