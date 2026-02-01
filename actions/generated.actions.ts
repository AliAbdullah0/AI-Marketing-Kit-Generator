"use server"

import prisma from "@/lib/prisma"

export const getGeneratedKit = async (id:string)=>{
    try {
        console.log("id:",id)
        const res = await prisma.generatedContent.findUnique({
            where:{
                id
            }
        })
        if(!res) throw new Error("Generated Content Not found !")
        return {
            status:200,
            kit:res
        }
    } catch (error) {
        return {
            status:500,
            message:"Error getting generated kit!"
        }
    }
}