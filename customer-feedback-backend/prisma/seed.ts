import { PrismaService } from '../src/prisma/prisma.service';
import slugify from 'slugify';

class Seed {
  constructor(private prisma: PrismaService) {}

  async run() {
    console.log('🌱 Seeding categories...');

    await this.prisma.category.deleteMany();

    const electronics = await this.prisma.category.create({
      data: {
        name: 'Electronics',
        slug: slugify('Electronics', { lower: true }),
        description: 'Electronic products',
        sortOrder: 1,
      },
    });

    const fashion = await this.prisma.category.create({
      data: {
        name: 'Fashion',
        slug: slugify('Fashion', { lower: true }),
        description: 'Clothing and accessories',
        sortOrder: 2,
      },
    });

    const mobiles = await this.prisma.category.create({
      data: {
        name: 'Mobiles',
        slug: slugify('Mobiles', { lower: true }),
        parent: {
          connect: { id: electronics.id },
        },
        sortOrder: 1,
      },
    });

    const laptops = await this.prisma.category.create({
      data: {
        name: 'Laptops',
        slug: slugify('Laptops', { lower: true }),
        parent: {
          connect: { id: electronics.id },
        },
        sortOrder: 2,
      },
    });

    const men = await this.prisma.category.create({
      data: {
        name: 'Men',
        slug: slugify('Men', { lower: true }),
        parent: {
          connect: { id: fashion.id },
        },
        sortOrder: 1,
      },
    });

    await this.prisma.category.createMany({
      data: [
        {
          name: 'Android Phones',
          slug: slugify('Android Phones', { lower: true }),
          parentId: mobiles.id,
          sortOrder: 1,
        },
        {
          name: 'Gaming Laptops',
          slug: slugify('Gaming Laptops', { lower: true }),
          parentId: laptops.id,
          sortOrder: 1,
        },
        {
          name: 'Shirts',
          slug: slugify('Shirts', { lower: true }),
          parentId: men.id,
          sortOrder: 1,
        },
      ],
    });

    console.log('✅ Category seeding completed');
  }
}

async function main() {
  const prisma = new PrismaService();
  await prisma.$connect();

  const seed = new Seed(prisma);
  await seed.run();

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error('❌ Seeding failed:', e);
  process.exit(1);
});
