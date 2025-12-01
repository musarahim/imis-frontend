"use client"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { useEmployeeData } from "@/hooks"
import {
  Building,
  HomeIcon,
  LifeBuoy,
  Send,
  Settings2
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { SidebarSkeleton } from "./sidebar-skeleton"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { user, isLoading } = useEmployeeData();

  // Function to check if a menu item is active
  const isActiveRoute = (url: string, items?: any[]) => {
    if (url !== "#" && pathname === url) return true
    if (items) {
      return items.some(item => item.url !== "#" && pathname.startsWith(item.url))
    }
    return false
  }
// --- Build permission & group sets from user ---

  const userPermissions = React.useMemo(() => {
    if (!user || !user.groups) return new Set<string>()
    return new Set(
      user.groups.flatMap((g) => g.permissions?.map((p) => p.codename) || [])
    )
  }, [user])

  const userGroups = React.useMemo(() => {
    if (!user || !user.groups) return new Set<string>()
    return new Set(user.groups.map((g) => g.name))
  }, [user])

  const canSeeItem = (item: any): boolean => {
    // If no requirements, everyone can see
    const requiredPerms: string[] = item.requiredPermissions ?? []
    const requiredGroups: string[] = item.requiredGroups ?? []

    // Check groups
    if (requiredGroups.length > 0) {
      const hasGroup = requiredGroups.some((g) => userGroups.has(g))
      if (!hasGroup) return false
    }

    // Check permissions
    if (requiredPerms.length > 0) {
      const hasPerm = requiredPerms.some((p) => userPermissions.has(p))
      if (!hasPerm) return false
    }

    return true
  }

  const data = React.useMemo(
    () => ({
      navMain: [
        {
          title: "Dashboard",
          url: "/",
          icon: HomeIcon,
          isActive: pathname === "/",
        },
        {
          title: "Leave",
          url: "#",
          icon: Building,
          isActive: isActiveRoute("#", [
            { title: "Leave Applications", url: "/leave/leave-applications" },
            { title: "My Leave Schedule", url: "/leave/my-leave-schedule" },
            { title: "My Leave", url: "/leave/my-leave" },
          ]),
          requiredGroups: ["Staff"],
          items: [
            {
              title: "Leave Applications",
              url: "/leave/leave-applications",
              isActive: pathname.startsWith("/leave/leave-applications"),
              requiredPermissions: ["view_leaveapplication"],
            },
            {
              title: "My Leave Schedule",
              url: "/leave/my-leave-schedule",
              isActive: pathname.startsWith("/leave/my-leave-schedule"),
              requiredPermissions: ["view_leaveapplication"],
            },
            {
              title: "My Leave",
              url: "/leave/my-leave",
              isActive: pathname.startsWith("/leave/my-leave"),
              requiredPermissions: ["view_leaveapplication"],
            },
          ],
        },
        {
          title: "Settings",
          url: "#",
          icon: Settings2,
          isActive: isActiveRoute("#", [
            { title: "Change Password", url: "/settings/password" },
            { title: "Manage Notifications", url: "/settings/notifications" },
          ]),
          items: [
            {
              title: "Change Password",
              url: "/settings/password",
              isActive: pathname.startsWith("/settings/password"),
            },
            {
              title: "Manage Notifications",
              url: "/settings/notifications",
              isActive: pathname.startsWith("/settings/notifications"),
            },
          ],
        },
      ],
      navSecondary: [
        {
          title: "Support",
          url: "#",
          icon: LifeBuoy,
        },
        {
          title: "Feedback",
          url: "#",
          icon: Send,
        },
      ],
    }),
    [pathname]
  )

  // --- Filter menu based on permissions/groups ---
  const filteredNavMain = React.useMemo(() => {
    return data.navMain
      .map((item) => {
        // If it has children, filter them too
        const childItems = item.items?.filter(canSeeItem) ?? []

        // Decide if parent is visible:
        // - if parent passes canSeeItem
        // - OR if it has any visible children (so parent can be used as group header)
        const parentVisible = canSeeItem(item) || childItems.length > 0

        if (!parentVisible) return null

        return {
          ...item,
          items: childItems,
        }
      })
      .filter(Boolean)
  }, [data.navMain, userPermissions, userGroups])

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="px-0 py-0">
             <Link href="/">
              <Image
                height={500}
                width={500}
                alt="NCHE IMIS"
                src="/images/logo2.png"
                className="object-cover bg-white rounded-lg w-full"
              />
             </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
       {isLoading ? <SidebarSkeleton /> : ( 
        <>
          <NavMain items={filteredNavMain as NavItem[]} />
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </>
        )} 
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}