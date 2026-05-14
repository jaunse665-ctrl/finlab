import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Database, Download, Search, FileSpreadsheet, FileText, LineChart } from "lucide-react"

const datasets = [
  {
    id: 1,
    title: "Precios Históricos FAANG (2018-2023)",
    description: "Precios de cierre ajustado diarios para Meta, Apple, Amazon, Netflix y Google. Ideal para cálculo de rendimientos y matriz de covarianzas.",
    type: "CSV",
    icon: FileText,
    category: "Acciones",
    size: "1.2 MB"
  },
  {
    id: 2,
    title: "Balances Financieros S&P500",
    description: "Estados de resultados y balances generales resumidos para 50 empresas del S&P500. Útil para el cálculo del Altman Z-Score.",
    type: "Excel",
    icon: FileSpreadsheet,
    category: "Riesgo Empresarial",
    size: "4.5 MB"
  },
  {
    id: 3,
    title: "Rendimientos Criptomonedas (Top 10)",
    description: "Datos minuto a minuto y diarios de Bitcoin, Ethereum y otras altcoins principales. Perfecto para simulaciones de alta volatilidad y VaR.",
    type: "CSV",
    icon: LineChart,
    category: "Criptoactivos",
    size: "12.8 MB"
  },
  {
    id: 4,
    title: "Tasas Macro y Bonos del Tesoro",
    description: "Tasas libres de riesgo (T-Bills 3m, 1y, 10y) y datos de inflación de la FED. Necesario para ajustar el Sharpe Ratio.",
    type: "CSV",
    icon: Database,
    category: "Macroeconomía",
    size: "500 KB"
  },
]

export default function DatasetsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1">
            <h1 className="text-sm font-medium">Biblioteca de Datasets</h1>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto bg-muted/20 p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Centro de Datos Financieros</h1>
                <p className="text-muted-foreground mt-1">
                  Descarga los conjuntos de datos limpios y estructurados que necesitarás para los laboratorios de R Studio.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar datasets (ej. 'Apple', 'VaR', 'Balances')..."
                  className="pl-8 bg-background"
                />
              </div>
              <Button variant="outline">Filtros</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {datasets.map((dataset) => (
                <Card key={dataset.id} className="flex flex-col h-full hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <dataset.icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {dataset.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl leading-tight">{dataset.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-medium text-foreground">{dataset.category}</span>
                      <span>•</span>
                      <span>{dataset.size}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {dataset.description}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-4 border-t">
                    <Button variant="default" className="w-full gap-2">
                      <Download className="h-4 w-4" />
                      Descargar Archivo
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
