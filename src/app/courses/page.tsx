import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, Code2, Database, PlayCircle, Trophy } from "lucide-react"
import Link from "next/link"

const modules = [
  { id: 1, title: "Desmitificando el Riesgo", status: "completed" },
  { id: 2, title: "Riesgos de Mercado", status: "in-progress" }
]

export default function CoursesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1">
            <h1 className="text-sm font-medium">Contenido</h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-muted/20 p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header del Curso */}
            <div className="bg-primary/10 rounded-xl p-8 border border-primary/20">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4">
                  <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    Curso Intensivo (21h)
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight">Modelos Financieros Aplicados</h1>
                  <p className="text-muted-foreground max-w-xl">
                    Aprende a analizar el mercado de valores, gestionar riesgos y construir portafolios eficientes mediante programación cuantitativa.
                  </p>
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <div className="flex items-center text-primary"><Trophy className="w-4 h-4 mr-1"/> {Math.round((modules.filter(m => m.status === 'completed').length / modules.length) * 100)}% Completado</div>
                    <div className="flex items-center text-muted-foreground"><BookOpen className="w-4 h-4 mr-1"/> {modules.length} Módulos</div>
                    <div className="flex items-center text-muted-foreground"><Code2 className="w-4 h-4 mr-1"/> R Base</div>
                  </div>
                </div>
                <div className="flex-shrink-0 w-full md:w-64">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Tu Progreso</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Progress value={(modules.filter(m => m.status === 'completed').length / modules.length) * 100} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground text-center">Continúa en el <strong>Módulo {modules.find(m => m.status === 'in-progress')?.id || 1}</strong></p>
                      <Link href={`/courses/module-${modules.find(m => m.status === 'in-progress')?.id || 1}`} className="w-full mt-4 flex">
                        <Button className="w-full">Continuar Clase</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Listado de Módulos */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight mb-6">Pensum Académico</h2>
              {modules.map((mod, i) => (
                <Card key={mod.id} className={`transition-all ${mod.status === 'locked' ? 'opacity-60 grayscale' : 'hover:border-primary/50'}`}>
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold
                      ${mod.status === 'completed' ? 'bg-green-500 text-white' : 
                        mod.status === 'in-progress' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      {mod.id}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{mod.title}</CardTitle>
                      <CardDescription>
                        {mod.status === 'completed' ? 'Módulo completado satisfactoriamente.' : 
                         mod.status === 'in-progress' ? 'En curso. Tienes actividades pendientes.' : 'Bloqueado. Completa el módulo anterior.'}
                      </CardDescription>
                    </div>
                    {mod.id <= 2 ? (
                      <Link href={`/courses/module-${mod.id}`}>
                        <Button variant={mod.status === 'in-progress' ? 'default' : 'outline'}>
                          {mod.status === 'in-progress' ? 'Continuar' : 'Repasar'}
                        </Button>
                      </Link>
                    ) : mod.status !== 'locked' ? (
                      <Button variant={mod.status === 'in-progress' ? 'default' : 'outline'}>
                        {mod.status === 'in-progress' ? 'Continuar' : 'Repasar'}
                      </Button>
                    ) : null}
                  </CardHeader>
                  <CardContent className="ml-14 pb-4">
                    {mod.status !== 'locked' && (
                      <div className="flex items-center gap-6 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center"><PlayCircle className="w-4 h-4 mr-1"/> 2 Lecciones</div>
                        <div className="flex items-center"><Code2 className="w-4 h-4 mr-1"/> 1 Laboratorio</div>
                        <div className="flex items-center"><Database className="w-4 h-4 mr-1"/> 1 Dataset</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
