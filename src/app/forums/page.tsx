import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { XFeed } from "./x-feed"
import { getTimeline } from "./actions"
import { auth } from "@/lib/auth"

export default async function ForumsPage() {
  const session = await auth();
  const userName = session?.user?.name || "Estudiante";
  const posts = await getTimeline();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight">Inicio</h1>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto bg-zinc-50">
          {/* Feed Container */}
          <div className="w-full">
            <XFeed initialPosts={posts} currentUserName={userName} />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
