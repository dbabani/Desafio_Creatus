import { UsersRepository } from "../repositories/usersRepository";
import { User } from "@prisma/client";
import { UserNotFoundError } from "../Error/UserNotFoundError";

interface GetUserByIDRequest{
    id: string
}

interface GetUserByIDResponse{
    user: User
}

export class GetUserByIDUSeCase{
    constructor(private usersRepository:UsersRepository) {}

    async execute({
       id
    }:GetUserByIDRequest): Promise<GetUserByIDResponse>{
        
        
        const user = await this.usersRepository.findById(id)
        
        if(!user){
            throw new UserNotFoundError()
        }
        return {user}
    }


}