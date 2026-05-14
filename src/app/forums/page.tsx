import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Search, PlusCircle, ThumbsUp, MessageCircle } from "lucide-react"

const threads = [
  {
    id: 1,
    title: "¿Por qué el Sharpe Ratio de mi portafolio sale negativo?",
    author: "María Gómez",
    module: "Módulo 3: Sharpe Ratio",
    replies: 4,
    likes: 12,
    time: "Hace 2 horas",
    solved: true,
  },
  {
    id: 2,
    title: "Duda sobre el cálculo de la volatilidad anualizada en R",
    author: "Juan Pérez",
    module: "Módulo 2: Estadística financiera",
    replies: 1,
    likes: 3,
    time: "Hace 5 horas",
    solved: false,
  },
  {
    id: 3,
    title: "Error al instalar la librería quantmod",
    author: "Ana Torres",
    module: "Módulo 1: Introducción",
    replies: 6,
    likes: 8,
    time: "Ayer",
    solved: true,
  },
  {
    id: 4,
    title: "Interpretación del Z-Score en zona gris",
    author: "Carlos López",
    module: "Módulo 7: Riesgo empresarial",
    replies: 0,
    likes: 2,
    time: "Hace 2 días",
    solved: false,
  },
]

export default function ForumsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1">
            <h1 className="text-sm font-medium">Foros Académicos</h1>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto bg-muted/20 p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Comunidad de Aprendizaje</h1>
                <p className="text-muted-foreground mt-1">Comparte dudas, código R y discute casos aplicados con tus compañeros.</p>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nueva Discusión
              </Button>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar en el foro..."
                  className="pl-8 bg-background"
                />
              </div>
              <Button variant="outline">Filtrar por Módulo</Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {threads.map((thread) => (
                <Card key={thread.id} className="hover:border-primary/50 transition-colors cursor-pointer group">
                  <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {thread.module}
                          </span>
                          {thread.solved && (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                              Resuelto
                            </span>
                          )}
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {thread.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-foreground">
                          {thread.author.charAt(0)}
                        </div>
                        <span>Publicado por <span className="font-medium text-foreground">{thread.author}</span> • {thread.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 hover:text-foreground transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="text-xs font-medium">{thread.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-foreground transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-xs font-medium">{thread.replies}</span>
                        </div>
                      </div>
                    </div>
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
