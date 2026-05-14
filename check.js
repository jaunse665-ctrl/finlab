const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.forumPost.findMany().then(console.log).finally(() => prisma.$disconnect());
