import fastify from "fastify"
import { ZodError } from "zod";
import { env } from "./env/index";
import fastifyJwt from "@fastify/jwt"
import { UserRoutes } from "./Controllers/Users/routes";
import { LoginRoutes } from "./Controllers/Login/routes";
import { generateUsers } from "./utils/generateUsers";
export const app = fastify();


//generateUsers() // Apenas para gerar 5 usuarios quando o serviço for inicializado -> Uma funcionalidade adicional(Ative caso precise)

app.register(fastifyJwt,{
    secret: env.JWT_SECRET 
})
app.register(LoginRoutes)
app.register(UserRoutes)

app.setErrorHandler((error, _ , reply) => {
    if(error instanceof ZodError){
        return reply
              .status(400)
              .send({message:"Validation error",issues:error.format})

    }

    if(env.NODE_ENV !== "production"){
        console.error(error);
    }

    return reply.status(500).send({message:"Internal server error"})

})