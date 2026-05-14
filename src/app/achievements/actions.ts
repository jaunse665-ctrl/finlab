"use server"

import { prisma, auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

const BADGE_CODES: Record<number, string> = {
  1: "FINLAB-R26",
  2: "SHARPE-PRO",
  3: "VAR-ALPHA",
  4: "MARKOWITZ-OPT",
  5: "QUANT-MASTER",
};

export async function claimBadgeWithCode(badgeId: number, code: string) {
  const session = await auth()
  
  if (!session?.user?.email) {
    throw new Error("No estás autenticado")
  }

  const expectedCode = BADGE_CODES[badgeId];
  if (!expectedCode || code.trim().toUpperCase() !== expectedCode) {
    throw new Error("Código incorrecto");
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

  if (!existingBadge) {
    // Si no la tiene, la reclamamos
    await prisma.userBadge.create({
      data: {
        userId: user.id,
        badgeId: badgeId
      }
    })
  } else {
    throw new Error("Ya tienes esta insignia");
  }

  revalidatePath("/achievements")
  return true;
}

export async function resetBadge(badgeId: number) {
  // Función oculta para des-reclamar (para testing del profesor)
  const session = await auth()
  if (!session?.user?.email) throw new Error("No autenticado")
  
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) return;

  await prisma.userBadge.deleteMany({
    where: { userId: user.id, badgeId }
  })
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
