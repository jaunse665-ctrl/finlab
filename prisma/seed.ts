import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient({ log: ['info'] })

async function main() {
  console.log('Iniciando el seed...')

  // Limpiar base de datos (opcional para desarrollo local)
  await prisma.user.deleteMany()
  await prisma.course.deleteMany()

  // 1. Crear Usuarios
  const passwordHash = await bcrypt.hash('password123', 10)

  const admin = await prisma.user.create({
    data: {
      name: 'Admin Global',
      email: 'admin@finlab.edu',
      passwordHash,
      role: 'ADMIN',
    },
  })

  const teacher = await prisma.user.create({
    data: {
      name: 'Dr. Finance R',
      email: 'docente@finlab.edu',
      passwordHash,
      role: 'TEACHER',
    },
  })

  const student = await prisma.user.create({
    data: {
      name: 'Estudiante Ejemplar',
      email: 'estudiante@finlab.edu',
      passwordHash,
      role: 'STUDENT',
    },
  })

  console.log('Usuarios creados.')

  // 2. Crear Curso
  const course = await prisma.course.create({
    data: {
      title: 'Modelos Financieros Aplicados con R',
      description: 'Curso intensivo de 21 horas sobre mercado de valores y riesgo cuantitativo.',
      isPublished: true,
    },
  })

  // 3. Crear Módulos
  const modulesData = [
    { title: 'Módulo 1: Introducción al mercado financiero y datos', order: 1 },
    { title: 'Módulo 2: Estadística financiera aplicada', order: 2 },
    { title: 'Módulo 3: Sharpe Ratio', order: 3 },
    { title: 'Módulo 4: Value at Risk', order: 4 },
    { title: 'Módulo 5: Portafolio eficiente de Markowitz', order: 5 },
    { title: 'Módulo 6: Series de tiempo financieras', order: 6 },
    { title: 'Módulo 7: Riesgo financiero empresarial (Altman Z-Score)', order: 7 },
    { title: 'Módulo 8: Proyecto Final', order: 8 },
  ]

  for (const mod of modulesData) {
    await prisma.module.create({
      data: {
        courseId: course.id,
        title: mod.title,
        order: mod.order,
        lessons: {
          create: [
            {
              title: `Teoría: Conceptos clave ${mod.title}`,
              type: 'READING',
              content: 'Contenido teórico sobre ' + mod.title,
              order: 1
            },
            {
              title: `Laboratorio R: Práctica ${mod.title}`,
              type: 'R_LAB',
              codeTemplate: '# Escribe tu código R aquí...',
              order: 2
            }
          ]
        }
      }
    })
  }

  console.log('Curso y módulos creados.')

  // 4. Crear Datasets Demo
  await prisma.dataset.createMany({
    data: [
      { title: 'Precios Históricos AAPL (CSV)', fileUrl: '#', description: 'Datos diarios de Apple (2020-2023)' },
      { title: 'Balances Financieros Ejemplos (Excel)', fileUrl: '#', description: 'Para modelo Altman Z-Score' },
    ]
  })

  console.log('Seed completado satisfactoriamente.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
