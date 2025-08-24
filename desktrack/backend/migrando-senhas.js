// migrar-senhas.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function migrarSenhas() {
  const usuarios = await prisma.users.findMany(); // ajusta o modelo `user`

  for (const user of usuarios) {
    // Se já é hash, pula
    if (user.password.startsWith('$2b$')) {
      console.log(`Usuário ${user.username} já encriptado, pulando...`);
      continue;
    }

    const hash = await bcrypt.hash(user.password, 10);

    await prisma.users.update({
      where: { id: user.id },
      data: { password: hash }
    });

    console.log(`Usuário ${user.username} migrado com sucesso ✅`);
  }

  await prisma.$disconnect();
}

migrarSenhas().catch(e => {
  console.error(e);
  prisma.$disconnect();
});
