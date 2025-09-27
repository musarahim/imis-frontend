"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LogOut
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useLogoutMutation, useRetrieveUserQuery } from "@/redux/features/authApiSlice"
import { logout as setLogout } from "@/redux/features/authSlice"
import { useAppDispatch } from "@/redux/hooks"
import { useRouter } from "next/navigation"

export function NavUser() {
  const { isMobile } = useSidebar()
  const dispatch = useAppDispatch();
 const [logout] = useLogoutMutation();
 const {data: user} = useRetrieveUserQuery();
 const router = useRouter();
 
 const handleLogout = () => {
  logout(undefined).unwrap().then(() => {
    dispatch(setLogout());
  });
 }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:text-gray-600 text-white"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.profile_pic ?? "/images/user.jpg"} alt={user?.username} />
                <AvatarFallback className="rounded-lg">NC</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight  ">
                <span className="truncate font-medium ">{user?.username}</span>
                
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.profile_pic ?? "/images/user.jpg"} alt={user?.username} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.username}</span>
                 
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
        
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push('/profile')}>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem >
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
              // Handle logout logic here
              handleLogout();
            }}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
