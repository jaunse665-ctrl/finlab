import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { SIMULATOR_DATA } from "@/data/simulators"
import { redirect } from "next/navigation"

export default async function SimulatorPage({ params }: { params: Promise<{ moduleId: string }> }) {
  const resolvedParams = await params;
  const simInfo = SIMULATOR_DATA[resolvedParams.moduleId];

  if (!simInfo) {
    redirect("/lab")
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white z-20">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1">
            <h1 className="text-sm font-medium text-muted-foreground">Simulador / {simInfo.title}</h1>
          </div>
        </header>

        <main className="flex-1 relative bg-zinc-100 overflow-hidden">
          <iframe 
            src={simInfo.url}
            className="w-full h-full border-none"
            title={simInfo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
