import { UsersRepository } from "../../repositories/usersRepository";
import { UserNotFoundError } from "../../Error/UserNotFoundError";

interface DeleteUserByIDRequest{
    id: string
}

export class DeleteUserByIDUSeCase{
    constructor(private usersRepository:UsersRepository) {}

    async execute({
       id
    }:DeleteUserByIDRequest){
        const userDoesExist = await this.usersRepository.findById(id)

        if(!userDoesExist){
           throw new UserNotFoundError()
        }

        await this.usersRepository.deleteById(id)
    }


}