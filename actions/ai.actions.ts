"use server"

import { generateAdIdeas } from "@/ai/ad.ai";
import { generateHashtags } from "@/ai/hashtags.ai";
import { generateLogoIdeas } from "@/ai/logo.ai";
import { generateBrandKit } from "@/ai/misc.ai";
import { generateMarketingPosts } from "@/ai/posts.ai";
import { generateWhatsAppMessages } from "@/ai/whatsapp.ai";
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/server";

export const processAIGeneration = async (kitId:string)=>{
    const session = await getSession();
    try {
        const kit = await prisma.kit.findUnique({
            where:{
                id:kitId
            }
        })
        if(!kit) throw new Error("Kit Not found !")

        const logos = await generateLogoIdeas(kit.businessName,kit.style,kit.tone)

        const posts = await generateMarketingPosts({
            data:{
                benefits:kit.benefits,
                features:kit.features,
                industry:kit.industry,
                name:kit.businessName,
                platforms:["X/Twitter","facebook","instagram","linkedin"],
                products:kit.products,
                region:kit.region,
                services:kit.services,
                style:kit.style,
                targetAudience:kit.targetAudience,
                tone:kit.tone
            }
        })

        const ads = await generateAdIdeas({
            benefits:kit.benefits,
            features:kit.features,
            industry:kit.industry,
            products:kit.products,
            region:kit.region,
            services:kit.services,
            targetAudience:kit.targetAudience
        },kit.tone,kit.style)

        const hashtags = await generateHashtags(kit.industry,kit.tone,kit.style)

        const whatsappMessages = await generateWhatsAppMessages({
            benefits:kit.benefits,
            features:kit.features,
            industry:kit.industry,
            products:kit.products,
            region:kit.region,
            services:kit.services,
            targetAudience:kit.targetAudience
        },kit.tone,kit.style)

        const misc = await generateBrandKit({
            benefits:kit.benefits,
            features:kit.features,
            industry:kit.industry,
            products:kit.products,
            region:kit.region,
            services:kit.services,
            style:kit.style,
            targetAudience:kit.targetAudience,
            tone:kit.tone
        })
        if(!session?.user.id) {
            throw new Error("User not found !")
        }
        const res = await prisma.generatedContent.create({
            data:{
                userId:session?.user.id,
                kitId,
                brandIdentity:misc.brandKit?.brandIdentity!,
                businessDescription:misc.brandKit?.businessDescription!,
                socialMediaStrategy:misc.brandKit?.socialMediaStrategy!,
                personas:misc.brandKit?.personas!,
                whatsappMessages:whatsappMessages.messages!,
                posts:posts.posts!,
                logoIdeas:logos.logos!,
                hashtags:hashtags.hashtags!,
                adIdeas:ads.adIdeas.ads!,
            }
        })
        console.log(res)
        return {
            status:201,
            message:"Kit Generated Successfully!",
            generatedKitId:res.id,
        }

    } catch (error) {
        return {
            status:500,
            message:'Error generating kit !',
            error:error
        }
    }
}