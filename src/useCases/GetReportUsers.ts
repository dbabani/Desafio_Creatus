import { UsersRepository } from "../repositories/usersRepository";
import { generatePdf } from "../utils/generatePdf";
import { UserAlreadyExistsError } from "../Error/UserAlreadyExistsError";
import { UnauthorizedAcessError } from "../Error/UnauthorizedAcessError";

interface GetReportUsersUSeCaseRequest {
    id: string
}

export class GetReportUsersUSeCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        id
    }: GetReportUsersUSeCaseRequest) {
        const UserLogged = await this.usersRepository.findById(id)

        if (UserLogged && (UserLogged.level === 4 || UserLogged.level === 5)) {
            const usersList = await this.usersRepository.getList()

            if (usersList.length == 0) {
                throw new UserAlreadyExistsError()
            }

            const pdfData = generatePdf(usersList)
            return pdfData


        } else {
            throw new UnauthorizedAcessError()
        }
    }


}