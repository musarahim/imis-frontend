"use client"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"

export function SidebarSkeleton() {
  return (
    <>
      {/* Main services section */}
      <SidebarGroup>
        <SidebarGroupLabel>Services</SidebarGroupLabel>

        <SidebarMenu>
          {[1, 2, 3].map((i) => (
            <SidebarMenuItem key={i}>
              {/* Parent item row */}
              <div className="flex items-center gap-2 px-2 py-1.5">
                <Skeleton className="h-4 w-4 rounded" />      {/* icon placeholder */}
                <Skeleton className="h-4 flex-1" />           {/* label placeholder */}
              </div>

              {/* Submenu skeleton */}
              <SidebarMenuSub>
                {[1, 2].map((j) => (
                  <SidebarMenuSubItem key={j}>
                    <div className="flex items-center gap-2 pl-8 py-1">
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      {/* Secondary nav area (Support / Feedback look-alike) */}
      <SidebarGroup className="mt-4">
        <SidebarGroupLabel>Other</SidebarGroupLabel>
        <SidebarMenu>
          {[1, 2].map((i) => (
            <SidebarMenuItem key={i}>
              <div className="flex items-center gap-2 px-2 py-1.5">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 flex-1" />
              </div>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  )
}
