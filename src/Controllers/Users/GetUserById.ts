import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeGetUserById } from "../../useCases/factories/makeGetUserBYIdUseCase";
import { UserNotFoundError } from "../../Error/UserNotFoundError";

export async function GetUserByID(request: FastifyRequest, reply: FastifyReply) { 
    const GetUserByIDParamsSchema = z.object({
        id: z.string()
    })

    const { id } = GetUserByIDParamsSchema.parse(request.params)
    
    try {
        const GetUserByIDUseCase = makeGetUserById()
        
        const { user } = await GetUserByIDUseCase.execute({ id })
        
        return reply.status(200).send({ user })

    } catch (error) {
        if(error instanceof UserNotFoundError){
            return reply.status(404).send({ error: error.message })
        }
      throw error
    }

}