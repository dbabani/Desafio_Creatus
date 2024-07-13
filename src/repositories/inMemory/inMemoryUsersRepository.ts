import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../usersRepository";
import { hash } from "bcryptjs";

export class InMemoryUsersRepository implements UsersRepository {
    public itens: User[] = [];

    async findById(id: string): Promise<User | null> {
        const user = this.itens.find((item) => item.id === id);
        return user || null;
    }

    async deleteById(id: string): Promise<void> {
        this.itens = this.itens.filter((item) => item.id !== id);
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const newUser: User = {
            id: this.generateId(),
            name: data.name,
            email: data.email,
            password: data.password,
            level: data.level,
        };
        this.itens.push(newUser);
        return newUser;
    }

    async updateById(id: string, data: User): Promise<User | null> {
        const index = this.itens.findIndex(user => user.id === id);
        if (index === -1) {
          return null; 
        }  
        this.itens[index] = { ...data,id }; 
        return this.itens[index];
      }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.itens.find((item) => item.email === email);
        return user || null;
    }

    async getList(): Promise<User[]> {
        return this.itens;
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}


