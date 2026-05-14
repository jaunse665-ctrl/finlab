"use client"

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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trophy, Code2, TrendingUp, ShieldAlert, Briefcase, Award, Lock, Sparkles, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { claimBadgeWithCode, getUserBadges, resetBadge } from "./actions"

const BASE_ACHIEVEMENTS = [
  {
    id: 1,
    title: "Primer Script en R",
    description: "Ejecutaste con éxito tu primer bloque de código en el Laboratorio.",
    icon: Code2,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    progress: 100 // It doesn't use progress when unlocked
  },
  {
    id: 2,
    title: "Experto en Sharpe",
    description: "Calculaste correctamente el Sharpe Ratio y optimizaste el riesgo.",
    icon: TrendingUp,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    progress: 100
  },
  {
    id: 3,
    title: "Analista de Riesgo",
    description: "Completaste las simulaciones de Value at Risk (VaR) histórico y Monte Carlo.",
    icon: ShieldAlert,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    progress: 45
  },
  {
    id: 4,
    title: "Constructor de Portafolios",
    description: "Graficaste la frontera eficiente de Markowitz para múltiples activos.",
    icon: Briefcase,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    progress: 0
  },
  {
    id: 5,
    title: "Maestría Cuantitativa",
    description: "Proyecto Final entregado y aprobado con excelencia.",
    icon: Award,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    progress: 0
  }
]

export default function AchievementsPage() {
  const [unlockedBadges, setUnlockedBadges] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isToggling, setIsToggling] = useState<number | null>(null)
  const [codes, setCodes] = useState<Record<number, string>>({})
  const [errors, setErrors] = useState<Record<number, string>>({})

  const loadBadges = async () => {
    try {
      const badges = await getUserBadges()
      setUnlockedBadges(badges)
    } catch (error) {
      console.error("Error loading badges:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadBadges()
  }, [])

  const handleClaim = async (badgeId: number) => {
    const code = codes[badgeId]
    if (!code) {
      setErrors({ ...errors, [badgeId]: "Ingresa un código" })
      return
    }

    setIsToggling(badgeId)
    setErrors({ ...errors, [badgeId]: "" })
    
    try {
      await claimBadgeWithCode(badgeId, code)
      // Success! Optimistically update and clear code
      setUnlockedBadges(prev => [...prev, { badgeId, createdAt: new Date() }])
      setCodes({ ...codes, [badgeId]: "" })
    } catch (error: any) {
      console.error("Error claiming badge:", error)
      setErrors({ ...errors, [badgeId]: error.message || "Código incorrecto" })
    } finally {
      setIsToggling(null)
    }
  }

  const handleReset = async (badgeId: number) => {
    // For testing/teacher purposes to remove a badge
    try {
      setUnlockedBadges(prev => prev.filter(b => b.badgeId !== badgeId))
      await resetBadge(badgeId)
    } catch (e) {
      loadBadges()
    }
  }

  const unlockedCount = unlockedBadges.length
  const totalCount = BASE_ACHIEVEMENTS.length
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100) || 0

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
        
        <main className="flex-1 overflow-auto bg-background p-6">
          <div className="max-w-5xl mx-auto space-y-8">
            
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 bg-zinc-50 border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center border-4 border-primary/10">
                  <Trophy className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-foreground">Tus Insignias</h1>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Reclama y colecciona medallas demostrando tus habilidades financieras en R.
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
              {BASE_ACHIEVEMENTS.map((achievement) => {
                const badgeRecord = unlockedBadges.find(b => b.badgeId === achievement.id)
                const isUnlocked = !!badgeRecord
                const dateStr = badgeRecord?.createdAt 
                  ? new Date(badgeRecord.createdAt).toLocaleDateString() 
                  : ""

                return (
                  <Card 
                    key={achievement.id} 
                    className={`relative overflow-hidden transition-all duration-500 rounded-2xl ${
                      isUnlocked 
                        ? `border-2 ${achievement.border} shadow-lg bg-white holographic-card hover:scale-[1.02]` 
                        : 'opacity-90 grayscale hover:grayscale-[0.5] border-border border-dashed border-2 bg-zinc-50'
                    }`}
                  >
                    {!isUnlocked && (
                      <div className="absolute top-4 right-4 bg-white/50 backdrop-blur rounded-full p-1 border shadow-sm">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-2 pt-8 z-10 relative">
                      <div className={`mx-auto h-16 w-16 rounded-[1.25rem] flex items-center justify-center mb-4 transition-colors duration-500 shadow-sm ${isUnlocked ? achievement.bg : 'bg-zinc-200'}`}>
                        <achievement.icon className={`h-8 w-8 transition-colors duration-500 ${isUnlocked ? achievement.color : 'text-zinc-400'}`} />
                      </div>
                      <CardTitle className={`text-lg font-bold ${isUnlocked ? 'text-zinc-900' : 'text-zinc-600'}`}>{achievement.title}</CardTitle>
                      
                      {isUnlocked ? (
                        <Badge variant="secondary" className="mx-auto mt-2 w-max text-xs bg-primary text-primary-foreground flex items-center gap-1 cursor-pointer hover:bg-red-500 hover:text-white transition-colors group" onClick={() => handleReset(achievement.id)}>
                          <Sparkles className="h-3 w-3 group-hover:hidden" />
                          <span className="group-hover:hidden">Reclamado: {dateStr}</span>
                          <span className="hidden group-hover:inline">Revocar (Test)</span>
                        </Badge>
                      ) : (
                        <div className="mt-4 space-y-3 px-2">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                              <span>Misión Oculta</span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <Progress value={achievement.progress || 0} className="h-1 bg-zinc-200" />
                          </div>
                          
                          <div className="space-y-2 pt-2">
                            <Input 
                              placeholder="Código secreto..."
                              className={`h-8 text-xs text-center font-mono uppercase bg-white ${errors[achievement.id] ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                              value={codes[achievement.id] || ""}
                              onChange={(e) => {
                                setCodes({...codes, [achievement.id]: e.target.value.toUpperCase()})
                                setErrors({...errors, [achievement.id]: ""})
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleClaim(achievement.id)
                              }}
                            />
                            {errors[achievement.id] && (
                              <p className="text-[10px] text-red-500 flex items-center justify-center gap-1 font-medium">
                                <AlertCircle className="w-3 h-3" /> {errors[achievement.id]}
                              </p>
                            )}
                            <Button 
                              disabled={isToggling === achievement.id || !codes[achievement.id]}
                              onClick={() => handleClaim(achievement.id)}
                              className="w-full h-8 text-xs font-bold bg-primary text-primary-foreground rounded-full hover:bg-primary/90 hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50"
                            >
                              {isToggling === achievement.id ? "Validando..." : "Desbloquear"}
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="text-center z-10 relative">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {achievement.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
