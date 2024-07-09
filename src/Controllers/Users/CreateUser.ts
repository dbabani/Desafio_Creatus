import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
const prisma = new PrismaClient()

export async function CreateUser(request:FastifyRequest,reply:FastifyReply){
    const CreateUserBodySchema = z.object({
        name: z.string(),
        email:z.string().email(),
        password:z.string(),
        level: z.number()
    })

    const {name,email,password,level} = CreateUserBodySchema.parse(request.body)

    const user = await prisma.user.findFirst({where:{email}})

    if(user){
        return reply.code(400).send({message:"User already exists"})
    }

    const hashedPassword = await hash(password,8)

    const newUser = await prisma.user.create({
        data:{
            name,
            email,
            password: hashedPassword,
            level
        }
    })

    return reply.status(200).send({message:`User ${newUser.email} created sucessfully`})
}