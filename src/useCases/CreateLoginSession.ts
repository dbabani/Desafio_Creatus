import { User } from "@prisma/client";
import { UsersRepository } from "../repositories/usersRepository";
import { compare } from "bcryptjs";
import { UserNotFoundError } from "../Error/UserNotFoundError";
import { InvalidCredentialsError } from "../Error/InvalidCredentialsError";


interface CreateLoginSessionUseCaseRequest{
    email:string,
    password:string
}

interface CreateLoginSessionUseCaseResponse{
    user:User
}

export class CreateLoginSessionUseCase{
    constructor(private usersRepository:UsersRepository){}

    async execute({
        email,
        password

    }:CreateLoginSessionUseCaseRequest): Promise<CreateLoginSessionUseCaseResponse>{
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new UserNotFoundError()
        }
        const correctUser = await compare(password,user.password)

        if(!correctUser){
            throw new InvalidCredentialsError()
        }

        return {user}
    }
}