import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
const prisma = new PrismaClient()

export async function GetUserByID(request:FastifyRequest,reply:FastifyReply){
    const GetUserByIDParamsSchema = z.object({
        id: z.string().uuid()
    })

    const {id} = GetUserByIDParamsSchema.parse(request.params)

    const user = await prisma.user.findFirst({where:{id:id}})

    if(!user){
        return reply.code(400).send({message:"User not Found"})
    }else{
        return reply.code(200).send({user})
    }
}