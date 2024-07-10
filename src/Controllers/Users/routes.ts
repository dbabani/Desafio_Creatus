import { FastifyInstance } from "fastify";
import { CreateUser } from "./CreateUser";
import { GetUserByID } from "./GetUserById";
import { GetUsers } from "./GetUsers";
import { UpdateUserByID } from "./UpdateUserById";
import { DeleteUserByID } from "./DeleteUserByID";
import { verifyJwt } from "../middlewares/JWTAuth";
import { GetReportUsers } from "./GetReportUsers";



export async function UserRoutes(app: FastifyInstance) {
    app.post("/users",CreateUser)
    app.get("/users",GetUsers)
    app.get("/users/:id",GetUserByID)
    app.put("/users/:id",UpdateUserByID)
    app.delete("/users/:id",DeleteUserByID)
    app.get("/users/report",{onRequest: [verifyJwt]},GetReportUsers)
}