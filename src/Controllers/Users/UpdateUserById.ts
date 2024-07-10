import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateUserById } from "../../useCases/factories/makeUpdateUserByIdUseCase";
import { UserNotFoundError } from "../../Error/UserNotFoundError";
const prisma = new PrismaClient()

export async function UpdateUserByID(request:FastifyRequest,reply:FastifyReply){
    const UpdateUserByIDBodySchema = z.object({
        name: z.string(),
        email:z.string().email(),
        password:z.string(),
        level: z.coerce.number().refine(value => value >= 1 && value <= 5, {
            message: "Level must be between 1 and 5",
        })
    })

    const UpdateUserByIDParamsShema = z.object({
        id: z.string().uuid()
    })

    const {name,email,password,level} = UpdateUserByIDBodySchema.parse(request.body)
    const {id} = UpdateUserByIDParamsShema.parse(request.params)

    const user = await prisma.user.findFirst({where:{email}})
      
    try {
        const UpdateUserByIDUSeCase = makeUpdateUserById()
        await UpdateUserByIDUSeCase.execute({id,name,email,password,level})
    } catch (error) {
        if(error instanceof UserNotFoundError){
            reply.status(404).send({message:error.message})
        }
        
        
    }
    return reply.status(200).send({message:`User got updated sucessfully`})
}