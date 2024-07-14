import { expect, describe, it, beforeEach, vi, MockedFunction } from 'vitest'
import { InMemoryUsersRepository } from '../../repositories/inMemory/inMemoryUsersRepository'
import { UnauthorizedAcessError } from '../../Error/UnauthorizedAcessError'
import { generatePdf } from '../../utils/generatePdf'
import { GetReportUsersUSeCase } from './GetReportUsers'

vi.mock('../utils/generatePdf')

let usersRepository: InMemoryUsersRepository
let sut: GetReportUsersUSeCase
let mockedGeneratePdf: MockedFunction<typeof generatePdf>

describe('Get Report Users Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetReportUsersUSeCase(usersRepository)
    mockedGeneratePdf = generatePdf as MockedFunction<typeof generatePdf>
  })

  it("should generate a PDF report if user is authorized", async () => {
    const user = await usersRepository.create({
      id: '6691b128c2a40a2b4f021de2',
      name: "Dhruv",
      email: "d.babani001@edu.pucrs.br",
      password: "123456",
      level: 4
    })

    const anotherUser = await usersRepository.create({
      id: 'another-user-id',
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456",
      level: 1
    })

    const pdfData = Buffer.from('PDF Data')
    mockedGeneratePdf.mockReturnValue(pdfData)

    const result = await sut.execute({ id: user.id })

    expect(result).toEqual(pdfData)
    expect(mockedGeneratePdf).toHaveBeenCalledWith([user, anotherUser])
  })

  it("should throw UnauthorizedAcessError if user is not authorized", async () => {
    const user = await usersRepository.create({
      id: '6691b128c2a40a2b4f021de2',
      name: "Dhruv",
      email: "d.babani001@edu.pucrs.br",
      password: "123456",
      level: 3
    })

    await expect(sut.execute({ id: user.id })).rejects.toBeInstanceOf(UnauthorizedAcessError)
  })
})
