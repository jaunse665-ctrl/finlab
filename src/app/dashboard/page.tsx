import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, CheckCircle, Clock, Trophy, Target } from "lucide-react"
import { auth, prisma } from "@/lib/auth"
import { DashboardChart } from "./chart"

const TOTAL_MODULES = 8 // Total de módulos planificados para la maestría

export default async function DashboardPage() {
  const session = await auth()
  const userName = session?.user?.name || "Estudiante"
  
  // Fetch all scores for the user
  const userScores = session?.user?.id ? await prisma.quizScore.findMany({
    where: { userId: session.user.id }
  }) : [];
  
  // Calculate total points by summing the highest score per module
  const bestScoresPerModule = new Map();
  userScores.forEach(s => {
    const currentBest = bestScoresPerModule.get(s.moduleId) || 0;
    if (s.score > currentBest) {
      bestScoresPerModule.set(s.moduleId, s.score);
    }
  });
  
  const points = Array.from(bestScoresPerModule.values()).reduce((sum, score) => sum + score, 0);
  const completedModulesCount = bestScoresPerModule.size;
  const progressPercentage = Math.round((completedModulesCount / TOTAL_MODULES) * 100);

  // Format data for the chart
  const chartData = Array.from(bestScoresPerModule.entries()).map(([moduleId, score]) => {
    // Convert "module-1" to "Módulo 1"
    const readableName = moduleId.replace("module-", "Módulo ");
    return {
      module: readableName,
      score: score
    }
  }).sort((a, b) => a.module.localeCompare(b.module));

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Bienvenido, {userName} 👋</h1>
        <p className="text-muted-foreground">Aquí está el resumen de tu progreso en Modelos Financieros.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Progreso del Curso</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressPercentage}%</div>
            <Progress value={progressPercentage} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Módulos Completados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedModulesCount} / {TOTAL_MODULES}</div>
            <p className="text-xs text-muted-foreground mt-1">Siguiente: Módulo {completedModulesCount + 1}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tareas Entregadas</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">0 pendientes por calificar</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">Puntos FinLab</CardTitle>
            <Target className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{points} pts</div>
            <p className="text-xs text-yellow-700/80 mt-1">Puntaje total acumulado</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Rendimiento por Módulo</CardTitle>
            <CardDescription>Tu máxima calificación en los Retos Gamificados</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full pt-4">
            <DashboardChart data={chartData} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Próximas Actividades</CardTitle>
            <CardDescription>Lo que tienes agendado para esta semana</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <BookOpen className="h-8 w-8 text-muted-foreground/50 mb-2" />
                <p className="text-sm font-medium text-muted-foreground">No tienes actividades próximas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
