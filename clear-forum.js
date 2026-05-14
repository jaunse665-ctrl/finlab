const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Eliminando respuestas del foro...");
  await prisma.forumReply.deleteMany({});
  
  console.log("Eliminando publicaciones del foro...");
  await prisma.forumPost.deleteMany({});
  
  console.log("¡Foro limpiado exitosamente! Listo para producción.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
