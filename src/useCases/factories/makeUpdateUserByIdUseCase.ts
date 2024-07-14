import { PrismaUsersRepository } from "../../repositories/prisma/prismaUserRepository";
import { UpdateUserByIDUSeCase } from "../Users/UpdateUserById";

export function makeUpdateUserById(){
    const usersRepository = new PrismaUsersRepository()
    const UpdateUserByIDUseCase = new UpdateUserByIDUSeCase(usersRepository)

    return UpdateUserByIDUseCase;

}