import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/inMemory/inMemoryUsersRepository'
import { UserNotFoundError } from '../Error/UserNotFoundError'
import { GetUsersUSeCase } from './GetUsers'

let usersRepository: InMemoryUsersRepository
let sut: GetUsersUSeCase

describe('Get Users Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUsersUSeCase(usersRepository)
  })

  it("should get all users", async () => {
    const usersToCreate = [
      {
        id: '6691b128c2a40a2b4f021de2',
        name: "Dhruv",
        email: "d.babani001@edu.pucrs.br",
        password: "123456",
        level: 4
      },
      {
        id: '6691b128c2a40a2b4f021de3',
        name: "Jane Doe",
        email: "jane.doe@example.com",
        password: "abcdef",
        level: 2
      }
    ]
    
    
    for (const user of usersToCreate) {
      await usersRepository.create(user)
    }

    const { users } = await sut.execute()
    expect(users).toHaveLength(usersToCreate.length)
  })

  it("should throw UserNotFoundError if no users exist", async () => {
    await expect(sut.execute()).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
