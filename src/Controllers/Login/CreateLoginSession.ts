import { PrismaClient } from "@prisma/client";
import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify/types/reply";
import { z } from "zod";
import { makeCreateLoginSession } from "../../useCases/factories/makeCreateLoginSessionUseCase";

const prisma = new PrismaClient()

export async function CreateLoginSession(request:FastifyRequest,reply:FastifyReply){
    const CreateLoginSessionBodySchema = z.object({
        email:z.string().email(),
        password:z.string()
    })

    const {email,password} = CreateLoginSessionBodySchema.parse(request.body)

    try {
        const createLoginSessionUseCase = makeCreateLoginSession()

        const {user} = await createLoginSessionUseCase.execute({
            email,
            password
        })

        const token = await reply.jwtSign({email: user.email},{sign:{sub:user.id}})
        reply.status(201).send({token})
        
    } catch (error) {
        if(error instanceof InternalServerError){
            return reply.status(409).send({message:error.message})
        }
    }

    return reply.status(200).send({message:"User logged in Sucessfully"})
}