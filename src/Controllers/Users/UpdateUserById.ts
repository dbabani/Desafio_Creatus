import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
const prisma = new PrismaClient()

export async function UpdateUserByID(request:FastifyRequest,reply:FastifyReply){
    const UpdateUserByIDBodySchema = z.object({
        name: z.string(),
        email:z.string().email(),
        password:z.string(),
        level: z.number()
    })

    const UpdateUserByIDParamsShema = z.object({
        id: z.string().uuid()
    })

    const {name,email,password,level} = UpdateUserByIDBodySchema.parse(request.body)
    const {id} = UpdateUserByIDParamsShema.parse(request.params)

    const user = await prisma.user.findFirst({where:{email}})

    if(!user){
        return reply.code(400).send({message:"User not Found"})
    }

    const hashedPassword = await hash(password,8)

    const newUser = await prisma.user.update({
        where:{
            id:id
        },
        data:{
            name,
            email,
            password:hashedPassword,
            level
        }
        
    })

    return reply.status(200).send({message:`User ${newUser.email} updated sucessfully`})
}