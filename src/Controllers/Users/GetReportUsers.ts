import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { IntegerType } from "mongodb";
import { z } from "zod";
import { generatePdf } from "../../utils/generatePdf";
import { makeGetReportUsers } from "../../useCases/factories/makeGetReportUsersUseCase";


export async function GetReportUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
        const userID = request.user.sub; 
        const GetReportUsersUSeCase = makeGetReportUsers()

        const pdfData = await GetReportUsersUSeCase.execute({id:userID})
        reply.header('Content-Type', 'application/pdf').send(pdfData);

    } catch (error) {
        console.error("Error fetching users:", error);
        reply.status(500).send({ message: "Internal server error" });
    }
}

