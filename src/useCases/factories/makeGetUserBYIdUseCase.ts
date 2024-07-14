import { PrismaUsersRepository } from "../../repositories/prisma/prismaUserRepository";
import { GetUserByIDUSeCase } from "../GetUserById";

export function makeGetUserById(){
    const usersRepository = new PrismaUsersRepository()
    const getUserByIDUseCase = new GetUserByIDUSeCase(usersRepository)

    return getUserByIDUseCase;

}