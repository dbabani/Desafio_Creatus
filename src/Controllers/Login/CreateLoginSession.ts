import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify/types/reply";
import { z } from "zod";
import { makeCreateLoginSession } from "../../useCases/factories/makeCreateLoginSessionUseCase";
import { InvalidCredentialsError } from "../../Error/InvalidCredentialsError";


export async function CreateLoginSession(request:FastifyRequest,reply:FastifyReply){
    const CreateLoginSessionBodySchema = z.object({
        email:z.string().email(),
        password:z.string().min(6)
    })

    const {email,password} = CreateLoginSessionBodySchema.parse(request.body)

    try {
        const createLoginSessionUseCase = makeCreateLoginSession()

        const {user} = await createLoginSessionUseCase.execute({
            email,
            password
        })

        const token = await reply.jwtSign({email: user.email},{sign:{sub:user.id}})
        
        const refreshToken = await reply.jwtSign({},{
            sign:{
                sub:user.id,
                expiresIn:"7d"
            }
        })
        
        reply.status(201)
        .setCookie("refreshToken",refreshToken,{
           path:"/",
           secure:true,
           sameSite:true,
           httpOnly:true 
        })
        .send({
            token
        })
        
    } catch (error) {
        if(error instanceof InvalidCredentialsError){
            return reply.status(409).send({message:error.message})
        }
        console.error(error);
       
    }

    
    
    
}