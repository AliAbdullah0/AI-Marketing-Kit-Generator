"use server"

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/server";


export const createMarketingKit = async (name: string) => {
    const session = await getSession();
    try {
        
        if (!session?.user?.id) {
            return {
                status: 401,
                message: "Unauthorized: Please log in to create a marketing kit"
            }
        }

        const response = await prisma.marketingKit.create({
            data: {
                name,
                userId: session.user.id,
            }
        });
        
        if (response) {
            return {
                status: 201,
                message: "Marketing Kit Created !",
                kitId: response.id
            }
        }
    } catch (error) {
        console.error("Error creating marketing kit:", error);
        return {
            status: 500,
            message: "Error creating Marketing Kit !"
        }
    }
};

export const getMarketingKit = async (id: string) => {
    try {
        const response = await prisma.marketingKit.findUnique({
            where: { id }
        });
    } catch (error) {
        console.error("Error getting marketing kit:", error);
        return {
            status: 500,
            message: "Error getting Marketing Kit !"
        }
    }
}

interface KitData {
    businessName:string;
    industry:string;
    products:string[];
    services:string[];
    tone:string;
    targetAudience:string;
    features:string;
    benefits:string;
    region:string;
    style:string
}

export const createNewKit = async (marketingKitId: string, data:KitData) => {
    const session = await getSession();

    try {

        if (!session?.user?.id) {
            return {
                status: 401,
                message: "Unauthorized: Please log in to create a kit"
            }
        }
        const { businessName,industry,services,style,products,tone,targetAudience,features,benefits,region } = data;
        const response = await prisma.kit.create({
            data: {
                marketingKitId,
                userId: session.user.id as string,
                businessName,
                industry,
                style,
                products,
                services,
                tone,
                targetAudience,
                features,
                benefits,
                region,
            }
        });

        if (response) {
            return {
                status: 201,
                message: "Information Saved !",
                kitId: response.id
            }
        }
    } catch (error) {
        console.error("Error creating new kit:", error);
        return {
            status: 500,
            message: "Error creating New Kit !"
        };
    }
};

export const getKit = async (id:string)=>{
    try {
        const kit = await prisma.kit.findUnique({
            where:{
                id
            }
        })
        if(!kit) {
            throw new Error("Kit doesn't exists !")
        }
        
    } catch (error) {
        
    }
}