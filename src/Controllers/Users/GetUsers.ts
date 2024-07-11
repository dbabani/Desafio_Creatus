import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUsers } from "../../useCases/factories/makeGetUsersUseCase";
import { UserNotFoundError } from "../../Error/UserNotFoundError";

export async function GetUsers(request:FastifyRequest,reply:FastifyReply){
    try {
        const GetUsersUseCase = makeGetUsers()
        const {users} = await GetUsersUseCase.execute()

        return reply.status(200).send({users})
    } catch (error) {
        if(error instanceof UserNotFoundError){
            return reply.status(404).send({message: error.message})
        }
        throw error
    }


}