import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { GamifiedQuiz } from "./quiz-component"
import { QUIZ_DATA } from "@/data/quizzes"
import { redirect } from "next/navigation"

export default async function ChallengePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const resolvedParams = await params;
  const quizInfo = QUIZ_DATA[resolvedParams.moduleId];

  if (!quizInfo) {
    redirect("/challenge")
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white z-20">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1">
            <h1 className="text-sm font-medium text-muted-foreground">Reto Gamificado / {quizInfo.title}</h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-zinc-50 p-4 md:p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2 mb-8">
              <h1 className="text-4xl font-black tracking-tight text-zinc-900">{quizInfo.title}</h1>
              <p className="text-lg text-zinc-500">{quizInfo.description}</p>
            </div>

            <GamifiedQuiz moduleId={resolvedParams.moduleId} questions={quizInfo.questions} />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
