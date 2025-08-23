import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'node:url';
 

const prisma = new PrismaClient();
 
async function main() {
  const file = resolve('prisma','db.json');
 
  const seed = JSON.parse(readFileSync(file, 'utf-8'));
 
for (const user of seed.users) {
    await prisma.users.create({ data: user });
  }

  // Inserir dispositivos
  for (const device of seed.devices) {
    await prisma.devices.create({ data: device });
  }

  // Inserir atividades
  for (const activity of seed.activities) {
    await prisma.activities.create({ data: activity });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
 