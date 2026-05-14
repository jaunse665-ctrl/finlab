import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, CheckCircle, Clock, Trophy } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Bienvenido, Estudiante 👋</h1>
        <p className="text-muted-foreground">Aquí está el resumen de tu progreso en Modelos Financieros con R.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Progreso del Curso</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
            <Progress value={45} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Módulos Completados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 / 8</div>
            <p className="text-xs text-muted-foreground mt-1">Siguiente: Value at Risk</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tareas Entregadas</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground mt-1">2 pendientes por calificar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Próxima Entrega</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">En 2 días</div>
            <p className="text-xs text-muted-foreground mt-1">Cálculo de Sharpe Ratio</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Rendimiento por Módulo</CardTitle>
            <CardDescription>Tus calificaciones en las últimas actividades</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-dashed border-2 rounded-md m-4">
            <p className="text-muted-foreground">Gráfico de Recharts irá aquí</p>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Próximas Actividades</CardTitle>
            <CardDescription>Lo que tienes agendado para esta semana</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Foro: Riesgo y Volatilidad", type: "Foro", time: "Hoy, 23:59" },
                { title: "Laboratorio: Sharpe Ratio", type: "Práctica R", time: "Mañana, 23:59" },
                { title: "Quiz Módulo 3", type: "Evaluación", time: "Viernes, 20:00" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4 border-b last:border-0 pb-4 last:pb-0">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.type}</p>
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
