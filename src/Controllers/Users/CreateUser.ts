import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateUser } from "../../useCases/factories/makeCreateUserUseCase";


export async function CreateUser(request: FastifyRequest, reply: FastifyReply) {
    const CreateUserBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        level: z.number()
    })

    const { name, email, password, level } = CreateUserBodySchema.parse(request.body)

    try {
        const CreateUserUseCase = makeCreateUser()

        await CreateUserUseCase.execute({
            name,
            email,
            password,
            level
        })
    } catch (error) {
        if(error instanceof UserAlreadyExistsError){
            return reply.status(409).send({message:error.message})
        }
    }

    return reply.status(201).send({message: "User created Sucessfully"})
}