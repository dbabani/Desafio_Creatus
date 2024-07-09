import { PrismaClient } from "@prisma/client";
import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify/types/reply";
import { z } from "zod";
import { compare } from "bcryptjs";

const prisma = new PrismaClient()

export async function CreateLoginSession(request:FastifyRequest,reply:FastifyReply){
    const CreateLoginSessionBodySchema = z.object({
        email:z.string().email(),
        password:z.string()
    })

    const {email,password} = CreateLoginSessionBodySchema.parse(request.body)

    const user = await prisma.user.findFirst({
        where:{
            email
        }
    })

    if(!user){
        return reply.code(401).send({message:"User not found"})
    }

    const correctUser = await compare(password, user.password)

    if(!correctUser){
        return reply.code(401).send({message:"Password is incorrect"})
    }

    try {
        const token = reply.jwtSign({email: user.email},{sign:{sub:user.id}})
        return reply.send({token})
        
    } catch (error) {
        return reply.status(400).send({message:"Internal failure",error})
        
    }

}