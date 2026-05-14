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
  MessageSquare
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
  { title: "Mis Cursos", url: "/courses", icon: BookOpen },
  { title: "Laboratorio R", url: "/lab", icon: Code2 },
  { title: "Foros", url: "/forums", icon: MessageSquare },
  { title: "Datasets", url: "/datasets", icon: Database },
  { title: "Logros", url: "/achievements", icon: Trophy },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex items-center pt-6 pb-2 px-4">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
          <BookOpen className="h-6 w-6 text-green-500" />
          <span>FinLab Univ.</span>
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
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link href="/settings" />}>
              <Settings />
              <span>Configuración</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
