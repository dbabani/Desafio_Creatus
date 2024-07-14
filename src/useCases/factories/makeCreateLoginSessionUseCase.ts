import { PrismaUsersRepository } from "../../repositories/prisma/prismaUserRepository";
import { CreateLoginSessionUseCase } from "../CreateLoginSession";


export  function makeCreateLoginSession(){
    const usersRepository = new PrismaUsersRepository()
    const createLoginSessionUseCase = new CreateLoginSessionUseCase(usersRepository)

    return createLoginSessionUseCase;

}