import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
const prisma = new PrismaClient()

export async function DeleteUserByID(request:FastifyRequest,reply:FastifyReply){
    const DeleteUserByIDParamsSchema = z.object({
        id: z.string().uuid()
    })

    const {id} = DeleteUserByIDParamsSchema.parse(request.params)

    const user = await prisma.user.findFirst({where:{id:id}})

    if(!user){
        return reply.code(400).send({message:"User not Found"})
    }

    await prisma.user.delete({where:{id}})

    return reply.status(200).send({message:'User deleted sucessfully'})
}