import { User, Prisma, PrismaClient } from "@prisma/client";
import { UsersRepository } from "../usersRepository";
const prisma = new PrismaClient()


export class PrismaUsersRepository implements UsersRepository{
    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({where:{id:id}})
        return user
    }
    async deleteById(id: string): Promise<void> {
        await prisma.user.delete({where:{id:id}})
    }
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({data})
        return user
    }
    async updateById(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        const user = await prisma.user.update({where:{id:id},data})
        return user
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({where:{email:email}})
        return user
    }
    async getList(): Promise<User[]> {
        const users = await prisma.user.findMany()
        return users
    }
    
}