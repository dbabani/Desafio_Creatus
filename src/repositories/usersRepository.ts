import { User,Prisma } from "@prisma/client";

export interface UsersRepository{
    findById(id: string): Promise<User | null>;
    deleteById(id: string): Promise<void>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    updateById(id: string, data: Prisma.UserUpdateInput): Promise<User>;
    findByEmail(email:string):Promise<User | null>;
    getList():Promise<User[]>;
}