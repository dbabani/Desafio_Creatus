import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../../repositories/inMemory/inMemoryUsersRepository'
import { UserNotFoundError } from '../../Error/UserNotFoundError'
import { GetUserByIDUSeCase } from './GetUserById'

let usersRepository: InMemoryUsersRepository
let sut: GetUserByIDUSeCase

describe('Get User By ID Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserByIDUSeCase(usersRepository)
  })

  it("should find a user by its ID", async () => {
    const user = await usersRepository.create({
      id: '6691b128c2a40a2b4f021de2',
      name: "Dhruv",
      email: "d.babani001@edu.pucrs.br",
      password: "123456",
      level: 4
    })

    await sut.execute({ id: user.id })

    const createdUser = await usersRepository.findById(user.id)
    expect(createdUser?.id).toEqual(expect.any(String))
  })

  it("should throw UserNotFoundError if user does not exist", async () => {
    await expect(sut.execute({ id: 'nonexistent-id' })).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
