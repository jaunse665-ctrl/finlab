import { redirect } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, AlertCircle } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/auth"
import bcrypt from "bcryptjs"

export default function RegisterPage({ searchParams }: { searchParams: { error?: string } }) {
  async function handleRegister(formData: FormData) {
    "use server"
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!name || !email || !password) {
      redirect("/register?error=Todos los campos son obligatorios")
    }

    try {
      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })

      if (existingUser) {
        redirect("/register?error=El correo ya está registrado")
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10)

      // Create user
      await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: "STUDENT", // Default role
        },
      })

      // Redirect to login after successful registration
      redirect("/login?error=Cuenta creada exitosamente. Ahora puedes iniciar sesión.")
    } catch (error: any) {
      if (error.message === 'NEXT_REDIRECT') {
        throw error;
      }
      console.error(error)
      redirect("/register?error=Ocurrió un error al crear la cuenta")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex flex-col items-center">
        <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center mb-4">
          <BookOpen className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">FinLab BVQ</h1>
        <p className="text-muted-foreground text-sm mt-1">Plataforma de Modelos Financieros</p>
      </div>
      
      <Card className="w-full max-w-sm border-none shadow-none bg-transparent">
        <CardHeader className="text-center">
          <CardTitle>Crear Cuenta</CardTitle>
          <CardDescription>
            Regístrate para acceder a la plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleRegister} className="w-full space-y-4">
            {searchParams?.error && (
              <div className={`p-3 text-sm rounded-md flex items-center gap-2 ${
                searchParams.error.includes("exitosamente") 
                  ? "text-green-600 bg-green-50 border border-green-200" 
                  : "text-red-500 bg-red-50 border border-red-200"
              }`}>
                <AlertCircle className="h-4 w-4" />
                {searchParams.error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" name="name" type="text" placeholder="Juan Pérez" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" name="email" type="email" placeholder="correo@ejemplo.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" name="password" type="password" required minLength={6} />
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <input 
                type="checkbox" 
                id="privacy" 
                name="privacy" 
                required 
                className="mt-1 h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="privacy"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Acepto la{" "}
                  <Dialog>
                    <DialogTrigger className="text-primary hover:underline underline-offset-4" type="button">
                      Política de Protección de Datos Personales
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Resumen de Protección de Datos (LOPDP)</DialogTitle>
                        <DialogDescription>
                          En cumplimiento con la Ley Orgánica de Protección de Datos Personales de Ecuador, te informamos en breves rasgos:
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                        <p><strong>1. Uso exclusivo:</strong> Tus datos (nombre, correo) se usan únicamente para darte acceso a los cursos, foros y herramientas de FinLab BVQ.</p>
                        <p><strong>2. No compartimos información:</strong> No vendemos ni cedemos tu información a terceros bajo ninguna circunstancia.</p>
                        <p><strong>3. Seguridad:</strong> Tu contraseña se almacena de forma encriptada (hasheada) y ni siquiera nuestros administradores pueden verla.</p>
                        <p><strong>4. Tus derechos:</strong> Tienes derecho a solicitar la actualización, rectificación o eliminación total de tu cuenta y datos en cualquier momento.</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </label>
                <p className="text-xs text-muted-foreground">
                  Al marcar esta casilla consientes el tratamiento de tus datos según la ley.
                </p>
              </div>
            </div>

            <Button className="w-full mt-4" type="submit">
              Registrarse
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p className="text-sm text-center text-muted-foreground w-full">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Iniciar Sesión
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
