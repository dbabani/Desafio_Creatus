import { PrismaUsersRepository } from "../../repositories/prisma/prismaUserRepository";
import { DeleteUserByIDUSeCase } from "../DeleteUserById";

export  function makeDeleteUserById(){
    const usersRepository = new PrismaUsersRepository()
    const deleteUserByIDUseCase = new DeleteUserByIDUSeCase(usersRepository)

    return deleteUserByIDUseCase;

}