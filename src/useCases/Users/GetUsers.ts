import { UsersRepository } from "../../repositories/usersRepository";
import { User } from "@prisma/client";
import { UserNotFoundError } from "../../Error/UserNotFoundError";

interface GetUsersUseCaseResponse{
    users: User[]
}

export class GetUsersUSeCase{
    constructor(private usersRepository:UsersRepository) {}

    async execute():Promise<GetUsersUseCaseResponse>{
           const usersList = await this.usersRepository.getList()

           if(usersList.length == 0){
              throw new UserNotFoundError()
           }

           return {users:usersList}
    }


}