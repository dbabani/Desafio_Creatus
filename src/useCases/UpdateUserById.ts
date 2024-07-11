import { hash } from "bcryptjs";
import { UsersRepository } from "../repositories/usersRepository";
import { UserNotFoundError } from "../Error/UserNotFoundError";

interface UpdateUserByIDRequest{
    id: string,
    name:string,
    email:string,
    password:string
    level:number
}

export class UpdateUserByIDUSeCase{
    constructor(private usersRepository:UsersRepository) {}

    async execute({
       id,
       name,
       email,
       password,
       level
    }:UpdateUserByIDRequest){
        const user = await this.usersRepository.findById(id)

        if(!user){
            throw new UserNotFoundError()
        }
    const hashedPassword = await hash(password,8)

    await this.usersRepository.updateById(id,{
        name,
        email,
        password:hashedPassword,
        level
       })
       
    }


}