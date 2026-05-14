import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Code2, TrendingUp, ShieldAlert, Briefcase, Award, Lock } from "lucide-react"

const achievements = [
  {
    id: 1,
    title: "Primer Script en R",
    description: "Ejecutaste con éxito tu primer bloque de código en el Laboratorio.",
    icon: Code2,
    unlocked: true,
    date: "12 Oct 2026",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    id: 2,
    title: "Experto en Sharpe",
    description: "Calculaste correctamente el Sharpe Ratio y optimizaste el riesgo.",
    icon: TrendingUp,
    unlocked: true,
    date: "14 Oct 2026",
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20"
  },
  {
    id: 3,
    title: "Analista de Riesgo",
    description: "Completaste las simulaciones de Value at Risk (VaR) histórico y Monte Carlo.",
    icon: ShieldAlert,
    unlocked: false,
    progress: 45,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20"
  },
  {
    id: 4,
    title: "Constructor de Portafolios",
    description: "Graficaste la frontera eficiente de Markowitz para múltiples activos.",
    icon: Briefcase,
    unlocked: false,
    progress: 0,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  },
  {
    id: 5,
    title: "Maestría Cuantitativa",
    description: "Proyecto Final entregado y aprobado con excelencia.",
    icon: Award,
    unlocked: false,
    progress: 0,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20"
  }
]

export default function AchievementsPage() {
  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalCount = achievements.length
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1">
            <h1 className="text-sm font-medium">Logros e Insignias</h1>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto bg-muted/20 p-6">
          <div className="max-w-5xl mx-auto space-y-8">
            
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 bg-primary/5 border border-primary/20 rounded-xl p-6">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary/20">
                  <Trophy className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Tus Insignias</h1>
                  <p className="text-muted-foreground mt-1">
                    Colecciona medallas demostrando tus habilidades financieras en R.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-64 space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Progreso Global</span>
                  <span>{unlockedCount} / {totalCount}</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`relative overflow-hidden transition-all duration-300 ${
                    achievement.unlocked 
                      ? `border-2 ${achievement.border} shadow-sm hover:shadow-md` 
                      : 'opacity-70 grayscale hover:grayscale-0'
                  }`}
                >
                  {!achievement.unlocked && (
                    <div className="absolute top-3 right-3">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-2 pt-8">
                    <div className={`mx-auto h-16 w-16 rounded-2xl flex items-center justify-center mb-4 ${achievement.unlocked ? achievement.bg : 'bg-muted'}`}>
                      <achievement.icon className={`h-8 w-8 ${achievement.unlocked ? achievement.color : 'text-muted-foreground'}`} />
                    </div>
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    {achievement.unlocked ? (
                      <Badge variant="secondary" className="mx-auto mt-2 w-max text-xs bg-primary/10 text-primary hover:bg-primary/20">
                        Desbloqueado: {achievement.date}
                      </Badge>
                    ) : (
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                          <span>Progreso</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress || 0} className="h-1" />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
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
