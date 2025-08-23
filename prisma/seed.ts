import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Seed taxonomies
  const taxonomiesPath = path.join(__dirname, 'seed', 'taxonomies.json');
  if (fs.existsSync(taxonomiesPath)) {
    const taxonomiesData = JSON.parse(fs.readFileSync(taxonomiesPath, 'utf8'));
    
    for (const taxonomy of taxonomiesData) {
      await prisma.taxonomy.upsert({
        where: { slug: taxonomy.slug },
        update: {},
        create: {
          name: taxonomy.name,
          slug: taxonomy.slug,
        },
      });
      console.log(`Seeded taxonomy: ${taxonomy.name}`);
    }
  }

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });