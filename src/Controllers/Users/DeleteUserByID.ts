import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteUserById } from "../../useCases/factories/makeDeleteUserByIdUseCase";
import { UserNotFoundError } from "../../Error/UserNotFoundError";

export async function DeleteUserByID(request:FastifyRequest,reply:FastifyReply){
    const DeleteUserByIDParamsSchema = z.object({
        id: z.string().uuid()
    })

    const {id} = DeleteUserByIDParamsSchema.parse(request.params)

    try {
        const deleteUserByIDUseCase = makeDeleteUserById()

        await deleteUserByIDUseCase.execute({id})

    } catch (error) {
        if(error instanceof UserNotFoundError)
           return reply.status(404).send({message: error.message})
        
    }
    return reply.status(200).send({message:'User deleted sucessfully'})
}