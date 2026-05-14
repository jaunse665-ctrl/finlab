import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { REditor } from "@/components/r-editor"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Copy, Download, CheckCircle2, AlertCircle } from "lucide-react"

const defaultRCode = `# Cálculo de Sharpe Ratio en R
# ------------------------------
# Este script descarga precios de Apple (AAPL)
# y calcula el Sharpe Ratio anualizado.

library(quantmod)

# 1. Definir activos y fechas
ticker <- "AAPL"
start_date <- "2022-01-01"
end_date <- "2023-01-01"

# 2. Descargar datos de Yahoo Finance
getSymbols(ticker, src = "yahoo", from = start_date, to = end_date)
prices <- Cl(AAPL) # Precios de cierre

# 3. Calcular rendimientos logarítmicos diarios
returns <- diff(log(prices))
returns <- na.omit(returns)

# 4. Parámetros para Sharpe Ratio
risk_free_rate <- 0.02 # 2% anual
trading_days <- 252

# Convertir tasa libre de riesgo a diaria
rf_daily <- risk_free_rate / trading_days

# 5. Calcular Promedio y Desviación Estándar
mean_return <- mean(returns)
std_dev <- sd(returns)

# 6. Sharpe Ratio Diario y Anualizado
sharpe_daily <- (mean_return - rf_daily) / std_dev
sharpe_annual <- sharpe_daily * sqrt(trading_days)

print(paste("Sharpe Ratio Anualizado:", round(sharpe_annual, 4)))
`

export default function LabPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1">
            <h1 className="text-sm font-medium">Laboratorio R - Módulo 3: Sharpe Ratio</h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-muted/20 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Actividad: Cálculo de Sharpe Ratio</h1>
                <p className="text-muted-foreground mt-1">Aprende a calcular el rendimiento ajustado por riesgo utilizando R.</p>
              </div>
              <Button>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Marcar como completado
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle>Editor de Código</CardTitle>
                      <CardDescription>Visualiza y copia el script base.</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-2" /> Copiar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" /> Script .R
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <REditor initialValue={defaultRCode} height="500px" />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Instrucciones</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <p>
                      En este ejercicio calcularemos el <strong>Sharpe Ratio</strong> para evaluar si el rendimiento de una acción compensa el riesgo asumido.
                    </p>
                    <Tabs defaultValue="pasos" className="w-full">
                      <TabsList className="w-full">
                        <TabsTrigger value="pasos" className="flex-1">Pasos</TabsTrigger>
                        <TabsTrigger value="rubrica" className="flex-1">Rúbrica</TabsTrigger>
                      </TabsList>
                      <TabsContent value="pasos" className="space-y-2 mt-4 text-muted-foreground">
                        <ol className="list-decimal pl-4 space-y-2">
                          <li>Descarga el dataset o usa <code>quantmod</code>.</li>
                          <li>Calcula los rendimientos diarios.</li>
                          <li>Define la tasa libre de riesgo.</li>
                          <li>Halla el promedio y desviación estándar de los rendimientos.</li>
                          <li>Aplica la fórmula del Sharpe Ratio anualizado.</li>
                        </ol>
                      </TabsContent>
                      <TabsContent value="rubrica" className="mt-4 text-muted-foreground">
                        <ul className="space-y-2">
                          <li>Cálculo correcto de rendimientos (30%)</li>
                          <li>Cálculo correcto de volatilidad (30%)</li>
                          <li>Resultado final de Sharpe Ratio (40%)</li>
                        </ul>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-900/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-sm text-orange-800 dark:text-orange-300">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Interpretación Financiera
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-orange-800/80 dark:text-orange-300/80">
                    Un Sharpe Ratio &gt; 1 indica que el activo está generando un retorno adecuado para el nivel de volatilidad que presenta. Menor a 1 indica que estás asumiendo demasiado riesgo para poco retorno.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Entregar Solución</CardTitle>
                    <CardDescription>Sube tu archivo .R o .Rmd</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed rounded-md p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                      <Download className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm font-medium">Haz clic o arrastra tu archivo aquí</p>
                      <p className="text-xs text-muted-foreground mt-1">Soporta .R, .Rmd, .qmd o .pdf</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
