"use server";
import { generateObject } from 'ai';
import { mistral } from "@ai-sdk/mistral";
import { z } from 'zod';
import prisma from '@/lib/prisma';

interface PostsData {
    name: string;
    industry: string;
    products: string[];
    services: string[];
    style: string;
    tone: string;
    targetAudience: string;
    features: string;
    benefits: string;
    region: string;
    platforms: string[]; 
}

export const generateMarketingPosts = async ({ data }: { data: PostsData }) => {
    try {
        const { name, tone, style, products, services, targetAudience, features, benefits, region, platforms } = data;

        const numberOfPosts = 20;
        const result = await generateObject({
            model: mistral("mistral-large-latest"),
            schema: z.array(
                z.object({
                    post: z.object({
                        title: z.string(),
                        content: z.string().describe("Marketing post content"),
                        date: z.string().describe("ISO date string, e.g. 2026-02-01"),
                        platform: z.string().describe("Platform for the post, e.g., Twitter, Instagram"),
                    }),
                })
            ),
            prompt: `
Generate ${numberOfPosts} marketing posts for a business named "${name}" in a ${tone} tone and ${style} style. 
The business offers the following products: ${products.join(", ")} and services: ${services.join(", ")}. 
Target audience: ${targetAudience}. 
Key features: ${features}. 
Key benefits: ${benefits}. 
Region: ${region}. 
Distribute posts across these platforms: ${platforms.join(", ")}. 
Each post should include a title, content, date (today's date or within this month), and the platform it is intended for.
      `,
        });


        return {
            status: 201,
            message: "Marketing posts generated successfully",
            posts: result.object,
        };
    } catch (error) {
        console.error("Error generating marketing posts:", error);
        return {
            status: 500,
            message: "Error occurred while generating marketing posts!",
            posts: [],
        };
    }
};
