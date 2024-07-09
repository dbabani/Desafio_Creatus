import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { IntegerType } from "mongodb";
import { z } from "zod";
import { generatePdf } from "../../utils/generatePdf";
const prisma = new PrismaClient()


export async function GetReportUsers(request: FastifyRequest, reply: FastifyReply) {
    const userID = request.user.sub; 
    const user = await prisma.user.findFirst({where:{id:userID}})
    
    if (user && (user.level === 4 || user.level === 5)) {
        try {
            const users = await prisma.user.findMany();
            if (users.length === 0) {
                return reply.status(404).send({ message: "No users found" });
            }

            const pdfData = generatePdf(users);

            reply.header('Content-Type', 'application/pdf').send(pdfData);
        } catch (error) {
            console.error("Error fetching users:", error);
            reply.status(500).send({ message: "Internal server error" });
        }
    } else {
        reply.status(403).send({ message: "Unauthorized" });
    }
}

