import { FastifyInstance } from "fastify";
import { CreateLoginSession } from "./CreateLoginSession";




export async function LoginRoutes(app: FastifyInstance) {
    app.post("/login",CreateLoginSession)

}