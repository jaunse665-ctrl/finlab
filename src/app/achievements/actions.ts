"use server"

import { prisma, auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function toggleBadge(badgeId: number) {
  const session = await auth()
  
  if (!session?.user?.email) {
    throw new Error("No estás autenticado")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    throw new Error("Usuario no encontrado")
  }

  const existingBadge = await prisma.userBadge.findUnique({
    where: {
      userId_badgeId: {
        userId: user.id,
        badgeId: badgeId
      }
    }
  })

  if (existingBadge) {
    // Si ya la tiene, la quitamos (Toggle Off)
    await prisma.userBadge.delete({
      where: {
        id: existingBadge.id
      }
    })
  } else {
    // Si no la tiene, la reclamamos (Toggle On)
    await prisma.userBadge.create({
      data: {
        userId: user.id,
        badgeId: badgeId
      }
    })
  }

  revalidatePath("/achievements")
}

export async function getUserBadges() {
  const session = await auth()
  
  if (!session?.user?.email) {
    return []
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      badges: true
    }
  })

  return user?.badges || []
}
