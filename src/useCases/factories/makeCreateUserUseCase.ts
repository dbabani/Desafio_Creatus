import { PrismaUsersRepository } from "../../repositories/prisma/prismaUserRepository";
import { CreateUserUSeCase } from "../CreateUser";

export  function makeCreateUser(){
    const usersRepository = new PrismaUsersRepository()
    const createUserUseCase = new CreateUserUSeCase(usersRepository)

    return createUserUseCase;

}