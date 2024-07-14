import { UsersRepository } from "../repositories/usersRepository";
import { generatePdf } from "../utils/generatePdf";
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

            const pdfData = generatePdf(usersList)
            return pdfData


        } else {
            throw new UnauthorizedAcessError()
        }
    }


}