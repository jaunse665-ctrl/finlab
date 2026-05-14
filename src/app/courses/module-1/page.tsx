import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Module1Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white z-20">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1">
            <h1 className="text-sm font-medium text-muted-foreground">Cursos / Módulo 1</h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-zinc-50 p-4 md:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Desmitificando el Riesgo</h1>
                <p className="text-zinc-500 mt-1">Módulo 1 • Lee atentamente la presentación antes de tomar el Reto Gamificado.</p>
              </div>
            </div>

            {/* Contenedor del PDF */}
            <Card className="overflow-hidden border-zinc-200 shadow-sm">
              <div className="bg-zinc-800 p-2 flex justify-between items-center text-zinc-400 text-xs">
                <span>DESMITIFICANDO EL RIESGO.pdf</span>
              </div>
              <CardContent className="p-0 h-[600px] w-full">
                <object 
                  data="/courses/modulo-1.pdf" 
                  type="application/pdf" 
                  className="w-full h-full"
                >
                  <p className="p-8 text-center text-muted-foreground">
                    Tu navegador no soporta visualización de PDFs embebidos. 
                    <a href="/courses/modulo-1.pdf" className="text-primary hover:underline ml-1">
                      Descárgalo aquí
                    </a>.
                  </p>
                </object>
              </CardContent>
            </Card>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-blue-900">¿Terminaste de leer?</h3>
                <p className="text-blue-800 text-sm">Pon a prueba tus conocimientos compitiendo contra otros estudiantes en el Reto Gamificado.</p>
              </div>
              <Link 
                href="/challenge/module-1" 
                className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold")}
              >
                Competir Ahora
              </Link>
            </div>
            
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
