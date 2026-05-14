"use client"

import * as React from "react"
import {
  BookOpen,
  LayoutDashboard,
  Users,
  Settings,
  Database,
  Code2,
  Trophy,
  MessageSquare,
  LineChart,
  Target
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

const studentNav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Pizarra de Networking", url: "/networking", icon: Users },
  { title: "Contenido", url: "/courses", icon: BookOpen },
  { title: "Reto Gamificado", url: "/challenge", icon: Target },
  { title: "Simulador de Riesgos", url: "/lab", icon: LineChart },
  { title: "Foros", url: "/forums", icon: MessageSquare },
  { title: "Datasets", url: "/datasets", icon: Database },
  { title: "Logros", url: "/achievements", icon: Trophy },
]

import { signOut } from "next-auth/react"
import { LogOut, User as UserIcon } from "lucide-react"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const [user, setUser] = React.useState<{name?: string, email?: string} | null>(null)
  
  React.useEffect(() => {
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(session => {
        if (session?.user) {
          setUser(session.user)
        }
      })
      .catch(console.error)
  }, [])

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex items-center pt-6 pb-2 px-4">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
          <BookOpen className="h-6 w-6 text-green-500" />
          <span>FinLab BVQ</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {studentNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={pathname.startsWith(item.url)} render={<Link href={item.url} />}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {user && (
            <SidebarMenuItem>
              <div className="flex items-center gap-3 px-2 py-3 mb-2 mt-2 bg-zinc-100 rounded-lg border border-zinc-200">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm">
                  {user.name?.charAt(0) || <UserIcon className="h-4 w-4" />}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-bold text-zinc-900 text-sm truncate w-full">{user.name}</span>
                  <span className="text-[10px] font-medium text-zinc-500 truncate w-full">{user.email}</span>
                </div>
              </div>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => signOut({ callbackUrl: '/' })} className="text-red-600 hover:text-red-700 hover:bg-red-50 font-medium">
              <LogOut className="h-4 w-4" />
              <span>Cerrar Sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
