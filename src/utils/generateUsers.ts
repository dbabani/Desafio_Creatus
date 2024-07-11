
import { PrismaClient} from '@prisma/client';
import { hash } from 'bcryptjs';
import casual from 'casual';
import { ObjectId } from 'bson';
const prisma = new PrismaClient();

export async function generateUsers() {
    const usersData = await Promise.all(Array.from({ length: 5 }, async () => ({
      id: new ObjectId().toString(), 
      name: casual.first_name,
      email: casual.email,
      password: await hash(casual.password, 8),
      level: casual.integer(1, 5), 
    })));
  
    const createdUsers = await prisma.user.createMany({
      data: usersData,
    });
  
    console.log('Clientes criados:', createdUsers);
  }
