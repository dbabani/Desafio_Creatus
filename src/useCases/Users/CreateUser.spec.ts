import { compare, hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../../repositories/inMemory/inMemoryUsersRepository'
import { CreateUserUSeCase } from './CreateUser'
import { UserAlreadyExistsError } from '../../Error/UserAlreadyExistsError'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUSeCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUSeCase(usersRepository)
  })


  it("should hash user password upon registration", async () => {

    const {user} =  await sut.execute({
         name:"Dhruv",
         email:"d.babani001@edu.pucrs.br",
         password:"123456",
         level: 4
     })

     const checkEqualToHashPassword = await compare("123456",user.password)

     expect(checkEqualToHashPassword).toBe(true)
     
 })


 it("should not be able to register with same email twice", async () => {
        
    const email = "d.babani001@edu.pucrs.br"

    await sut.execute({
        name:"Dhruv",
        email,
        password:"123456",
        level: 4
    })

    await expect(() => 
        sut.execute({
            name:"Dhruv",
            email,
            password:"123456",
            level: 4
        }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    

    
})

it("should be able to create an User", async () => {
    

    const email = "d.babani001@edu.pucrs.br"

   const {user} =  await sut.execute({
        name:"Dhruv",
        email,
        password:"123456",
        level: 4
    })

    expect(user.id).toEqual(expect.any(String))

    

    })

})