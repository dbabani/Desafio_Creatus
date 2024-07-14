import { PrismaUsersRepository } from "../../repositories/prisma/prismaUserRepository";
import { GetReportUsersUSeCase } from "../Users/GetReportUsers";

export  function makeGetReportUsers(){
    const usersRepository = new PrismaUsersRepository()
    const getReportUsersUSeCase = new GetReportUsersUSeCase(usersRepository)

    return getReportUsersUSeCase;

}