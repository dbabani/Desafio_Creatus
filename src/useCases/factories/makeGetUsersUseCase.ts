import { PrismaUsersRepository } from "../../repositories/prisma/prismaUserRepository";
import { GetUsersUSeCase } from "../Users/GetUsers";

export  function makeGetUsers(){
    const usersRepository = new PrismaUsersRepository()
    const getUsersUSeCase = new GetUsersUSeCase(usersRepository)

    return getUsersUSeCase;

}