"use client"

import { FileText, Home, LogOut, Upload, User } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import type React from "react"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"

import { useToast } from "@/components/toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { UserData } from "@/services/Auth/me"
import { User as UserClass } from "@/services/User.service"

import Loading from "../loading"

interface NavItemProps {
  href: string
  icon: React.ElementType
  label: string
  badge?: number
  currentPath: string
  onNavigateStart?: () => void
}

const NavItem = ({ href, icon: Icon, label, currentPath, onNavigateStart }: NavItemProps) => {
  const isActive = currentPath === href
  const router = useRouter()

  const handleClick = () => {
    if (href !== currentPath) {
      onNavigateStart?.()
      router.push(href)
    }
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={handleClick}
        isActive={isActive}
        className="text-gray-300 hover:bg-gray-800 hover:text-white data-[active=true]:bg-blue-600 data-[active=true]:text-white"
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const toast = useToast()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/projects", icon: FileText, label: "Projects" },
    { href: "/upload", icon: Upload, label: "Upload Task" },
  ]

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, error } = await UserClass.me()
        if (error) {
          toast.error({ title: "Error", description: error })
          return
        }
        setUserData(data!)
      } catch (err) {
        console.error("Failed to fetch user data:", err)
        toast.error({
          title: "Error",
          description: "Failed to fetch user data. Please try again later.",
        })
      }
    }

    fetchUserData()
  }, [toast])

  // ✅ FIX: Reset isNavigating when the path changes
  useEffect(() => {
    setIsNavigating(false)
  }, [pathname])

  const handleLogout = async () => {
    try {
      const { error } = await UserClass.logout()
      if (error) {
        toast.error({ title: "Error", description: error })
        return
      }

      toast.success({
        title: "Logout",
        description: "You have successfully logged out",
      })

      router.push("/auth")
    } catch (err) {
      console.error("Failed to logout:", err)
      toast.error({
        title: "Error",
        description: "Failed to logout. Please try again later." + (err instanceof Error ? err.message : ""),
      })
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#030712]">
      <SidebarProvider>
        <Sidebar className="w-64 shrink-0 border-r border-gray-800 bg-[#030712]">
          <SidebarHeader className="border-b border-gray-800 p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">
                <FileText className="h-4 w-4" />
              </div>
              <h1 className="text-xl font-bold text-white">WorkDash</h1>
            </div>
          </SidebarHeader>
          <SidebarContent className="bg-[#030712] px-2">
            <div className="mb-4 mt-4 px-2" />
            <div className="px-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Main</h2>
            </div>
            <SidebarMenu>
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  currentPath={pathname}
                  onNavigateStart={() => setIsNavigating(true)}
                />
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-gray-800 bg-[#030712]">
            <div className="p-4">
              <div className="mb-4 flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={userData?.avatar || "/placeholder.svg?height=40&width=40"} alt={userData?.name || "User"} />
                  <AvatarFallback className="bg-blue-600 text-white">
                    {userData?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-white">{userData?.name || "User"}</p>
                  <p className="text-xs text-gray-400">{userData?.email || "user@example.com"}</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full gap-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" /> Log Out
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-800 bg-[#030712] px-6">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4 text-gray-400 hover:text-white" />
              <h1 className="text-xl font-semibold text-white">
                {navItems.find((item) => item.href === pathname)?.label || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userData?.avatar || "/placeholder.svg?height=32&width=32"} alt={userData?.name || "User"} />
                      <AvatarFallback className="bg-blue-600 text-white">
                        {userData?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userData?.name || "User"}</p>
                      <p className="text-xs leading-none text-gray-500">{userData?.email || "user@example.com"}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href="/profile">
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto bg-gray-950">
            {isNavigating ? <Loading /> : children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}
