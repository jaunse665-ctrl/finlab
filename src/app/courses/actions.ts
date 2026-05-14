"use server"

import { prisma, auth } from "@/lib/auth"

export async function submitQuizScore(moduleId: string, score: number) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" }
    }

    // Save the score
    await prisma.quizScore.create({
      data: {
        userId: session.user.id,
        moduleId,
        score
      }
    })

    return { success: true }
  } catch (error) {
    console.error("Error submitting score:", error)
    return { success: false, error: "Failed to submit score" }
  }
}

export async function getLeaderboard(moduleId: string) {
  try {
    // Get top 10 scores for the module, grouped by user to get their max score
    // Since Prisma group by is limited with relations, we'll fetch top raw scores
    // and distinct by userId in memory, or just take top 10 overall.
    // For a simple Kahoot style, we'll take top 10 overall.
    const topScores = await prisma.quizScore.findMany({
      where: { moduleId },
      orderBy: { score: 'desc' },
      take: 20,
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    })

    // Filter to keep only the highest score per user
    const userScores = new Map()
    topScores.forEach(score => {
      if (!userScores.has(score.userId)) {
        userScores.set(score.userId, score)
      }
    })

    return Array.from(userScores.values()).slice(0, 10).map((s, index) => ({
      position: index + 1,
      name: s.user.name || s.user.email?.split('@')[0] || "Estudiante",
      score: s.score,
      date: s.createdAt
    }))

  } catch (error) {
    console.error("Error fetching leaderboard:", error)
    return []
  }
}
