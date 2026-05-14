import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, CheckCircle, AlertTriangle } from "lucide-react"

export default function TeacherDashboard() {
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Panel del Docente 👨‍🏫</h1>
        <p className="text-muted-foreground">Visión general del curso de Modelos Financieros.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">+2 esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Entregas Pendientes</CardTitle>
            <FileText className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">Requieren calificación</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aprobación Promedio</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground mt-1">Buen rendimiento general</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Dudas en Foro</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">Sin responder</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Últimas Entregas</CardTitle>
            <CardDescription>Trabajos recientes subidos por estudiantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Juan Pérez", file: "sharpe_ratio_jp.R", time: "Hace 2 horas" },
                { name: "María Gómez", file: "analisis_var.Rmd", time: "Hace 5 horas" },
                { name: "Carlos López", file: "markowitz_opt.R", time: "Ayer" },
              ].map((sub, i) => (
                <div key={i} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                      {sub.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{sub.name}</p>
                      <p className="text-xs text-muted-foreground">{sub.file}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {sub.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estudiantes en Riesgo</CardTitle>
            <CardDescription>Baja participación o notas deficientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Ana Torres", issue: "No entregó Lab 2", grade: "55/100" },
                { name: "Luis Mendoza", issue: "Ausente en últimas 3 sesiones", grade: "N/A" },
              ].map((student, i) => (
                <div key={i} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.issue}</p>
                  </div>
                  <div className="text-sm font-bold">
                    {student.grade}
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
