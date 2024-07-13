import { hash } from "bcryptjs";
import { UsersRepository } from "../repositories/usersRepository";
import { UserAlreadyExistsError } from "../Error/UserAlreadyExistsError";

interface CreateUserUSeCaseRequest{
    name:string,
    email:string,
    password:string,
    level:number
}

export class CreateUserUSeCase{
    constructor(private usersRepository:UsersRepository) {}

    async execute({
        name,
        email,
        password,
        level
    }:CreateUserUSeCaseRequest){
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists){
            throw new UserAlreadyExistsError()
        }

        const passwordHash = await hash(password,8)

        const user = await this.usersRepository.create({
            name,
            email,
            password:passwordHash,
            level
        })

        return {user}
    }


}