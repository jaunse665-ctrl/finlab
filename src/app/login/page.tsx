"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="mb-8 flex flex-col items-center">
        <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center mb-4">
          <BookOpen className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold">FinLab University</h1>
        <p className="text-muted-foreground text-sm">Plataforma de Modelos Financieros en R</p>
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder al aula virtual.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" type="email" placeholder="estudiante@finlab.edu" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <span className="text-xs text-primary cursor-pointer hover:underline">¿Olvidaste tu contraseña?</span>
            </div>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full">Entrar a clases</Button>
          <p className="text-xs text-center text-muted-foreground">
            ¿No tienes cuenta? <span className="text-primary cursor-pointer hover:underline">Regístrate aquí</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
