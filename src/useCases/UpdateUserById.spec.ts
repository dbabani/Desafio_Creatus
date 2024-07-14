import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/inMemory/inMemoryUsersRepository'
import { UserNotFoundError } from '../Error/UserNotFoundError'
import { UpdateUserByIDUSeCase } from './UpdateUserById'
import { compare, hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: UpdateUserByIDUSeCase

describe('Update User By ID Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserByIDUSeCase(usersRepository)
  })

  it("should update a user by its ID", async () => {

    const user = {
      id: '6691b128c2a40a2b4f021de2',
      name: "Dhruv",
      email: "d.babani001@edu.pucrs.br",
      password: "123456",
      level: 4
    }

    const userCreated = await usersRepository.create(user)
    
    const userUpdated = await sut.execute({
        id: userCreated.id,
        name: "Bhav",
        email: "b.babani002@edu.pucrs.br",
        password: "654321",
        level: 5
    })


    expect(userUpdated).toEqual(expect.objectContaining({
        name: "Bhav",
        email: "b.babani002@edu.pucrs.br",
        level: 5
    }))

    if (userUpdated && userUpdated.password) {
        const isPasswordMatch = await compare("654321", userUpdated.password)
        expect(isPasswordMatch).toBeTruthy()
      }

  })

  it("should throw UserNotFoundError if user does not exist", async () => {
    await expect(sut.execute({ id: 'nonexistent-id' ,name:"",email:"",password:"",level:0})).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
