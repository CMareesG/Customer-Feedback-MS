import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';

dotenv.config();

// Create PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create adapter
const adapter = new PrismaPg(pool);

// Create Prisma client with adapter
const prisma = new PrismaClient({
  adapter,
});

async function main() {

  const category = await prisma.category.create({
    data: {
      name: 'Electronic',
      slug: 'electronic',
      description: 'Electronic items',
    },
  });

  const user = await prisma.user.create({
    data: {
      name: 'test',
      email: 'test@gmail.com',
      password: await bcrypt.hash('test123', 10),
      role: 'CUSTOMER',
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@gmail.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'ADMIN',
    },
  });

  const product = await prisma.product.create({
    data: {
      name: 'iPhone 15123',
      description: 'Latest phone123',
      img: 'iphone.jpg123',
      categoryId: category.id,
    },
  });

  await prisma.feedback.create({
    data: {
      productId: product.id,
      userId: user.id,
      rating: 5,
      review: 'Excellent123',
    },
  });

  console.log('Seed completed successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
