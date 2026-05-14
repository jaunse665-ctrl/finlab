import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, ArrowRight } from "lucide-react"
import Link from "next/link"
import { QUIZ_DATA } from "@/data/quizzes"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ChallengeIndexPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white z-20">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1">
            <h1 className="text-sm font-medium text-muted-foreground">Reto Gamificado</h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-zinc-50 p-4 md:p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-2 mb-8">
              <h1 className="text-4xl font-black tracking-tight text-zinc-900">Arena de Retos Gamificados</h1>
              <p className="text-lg text-zinc-500">Selecciona el módulo en el que quieres competir y sube al podio de FinLab.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(QUIZ_DATA).map(([moduleId, quizInfo]) => (
                <Card key={moduleId} className="border-2 hover:border-primary/50 transition-all hover:shadow-md">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{quizInfo.title}</CardTitle>
                    <CardDescription>{quizInfo.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link 
                      href={`/challenge/${moduleId}`} 
                      className={cn(buttonVariants({ variant: "outline" }), "w-full")}
                    >
                      Entrar al Reto <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
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
