import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetReportUsers } from "../../useCases/factories/makeGetReportUsersUseCase";

export async function GetReportUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
        const userID = (request.user.sub); 
        const GetReportUsersUSeCase = makeGetReportUsers()

        const pdfData = await GetReportUsersUSeCase.execute({id:userID})
        reply.header('Content-Type', 'application/pdf').send(pdfData);
        

    } catch (error) {
        console.error("Error fetching users:", error);
        reply.status(500).send({ message: "Unauthorized acess" });
        throw error
    }

    return reply.status(200).send({message:"PDF Created sucessfully"})
}

