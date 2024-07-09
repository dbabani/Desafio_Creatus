import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { IntegerType } from "mongodb";
import { z } from "zod";
const prisma = new PrismaClient()


export async function GetUsers(request:FastifyRequest,reply:FastifyReply){
    const users = await prisma.user.findMany()
    if(users.length == 0){
        return reply.status(404).send({message:"No users found"})
    }else{
        return reply.status(200).send({users})
    }


}