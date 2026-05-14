import Link from "next/link";
import { BookOpen, LineChart, Users, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950 font-sans">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-40 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-4">
                <LineChart className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400">
                FinLab University
              </h1>
              <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                La plataforma de educación avanzada para modelos financieros, trading cuantitativo y análisis de datos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
                <Link 
                  href="/networking" 
                  className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Iniciar
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-16 md:py-24 bg-zinc-50 dark:bg-zinc-950">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Cursos Interactivos</h3>
                <p className="text-zinc-500 dark:text-zinc-400 mb-4 flex-1">Aprende con laboratorios prácticos en R y Python integrados directamente en tu navegador.</p>
                <Link href="/courses" className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  Ver catálogo <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="flex flex-col p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Foros de Discusión</h3>
                <p className="text-zinc-500 dark:text-zinc-400 mb-4 flex-1">Conecta con otros estudiantes y profesores para resolver dudas sobre modelos financieros complejos.</p>
                <Link href="/forums" className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  Ir a los foros <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="flex flex-col p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Laboratorio (Lab)</h3>
                <p className="text-zinc-500 dark:text-zinc-400 mb-4 flex-1">Ejecuta código, prueba estrategias de Pair Trading y analiza resultados en tiempo real.</p>
                <Link href="/lab" className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  Abrir laboratorio <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row text-center md:text-left">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            © 2026 FinLab University. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
