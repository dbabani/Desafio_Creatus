import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../../repositories/inMemory/inMemoryUsersRepository'
import { DeleteUserByIDUSeCase } from './DeleteUserById'
import { UserNotFoundError } from '../../Error/UserNotFoundError'

let usersRepository: InMemoryUsersRepository
let sut: DeleteUserByIDUSeCase

describe('Delete User By ID Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteUserByIDUSeCase(usersRepository)
  })

  it("should delete a user by its ID", async () => {
    const user = await usersRepository.create({
      id: '6691b128c2a40a2b4f021de2',
      name: "Dhruv",
      email: "d.babani001@edu.pucrs.br",
      password: "123456",
      level: 4
    })

    await sut.execute({ id: user.id })

    const deletedUser = await usersRepository.findById(user.id)
    expect(deletedUser).toBeNull()
  })

  it("should throw UserNotFoundError if user does not exist", async () => {
    await expect(sut.execute({ id: 'nonexistent-id' })).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
