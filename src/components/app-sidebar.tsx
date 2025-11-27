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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  // Function to check if a menu item is active
  const isActiveRoute = (url: string, items?: any[]) => {
    if (url !== "#" && pathname === url) return true
    if (items) {
      return items.some(item => item.url !== "#" && pathname.startsWith(item.url))
    }
    return false
  }

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/",
        icon: HomeIcon,
        isActive: pathname === "/"
      },
      {
        title: "Leave",
        url: "#",
        icon: Building,
        isActive: isActiveRoute("#", [
          { title: "Leave Applications", url: "/leave-applications" },
          { title: "My Leave Schedule", url: "/my-leave-schedule" },
          { title: "My Leave", url: "/my-leave" },
        ]),
        items: [
          {
            title: "Leave Applications",
            url: "/leave-applications",
            isActive: pathname.startsWith("/leave-applications")
          },
          {
            title: "My Leave Schedule",
            url: "/my-leave-schedule",
            isActive: pathname.startsWith("/my-leave-schedule")
          },
          {
            title: "My Leave",
            url: "/my-leave",
            isActive: pathname.startsWith("/my-leave")
          },
        ],
      },
      // {
      //   title: "License Applications",
      //   url: "#",
      //   icon: BookOpen,
      //   isActive: isActiveRoute("#", [
      //     { title: "Classification & Registration", url: "/classification-registration" },
      //     { title: "Provisional License (OTI)", url: "/provisional-license-oti" },
      //     { title: "Provisional License (ODAI)", url: "/provisional-license-odai" },
      //     { title: "Interim Authority (ODAI)", url: "/odai-interim-authority" },
      //     { title: "Grant of a charter (ODAI)", url: "/grant-charter-odai" },
      //     { title: "Interim Authority (University)", url: "/interim-authority" },
      //     { title: "Provisional License (University)", url: "/provisional-license-university" },
      //     { title: "Grant of a charter (University)", url: "/grant-charter-university" },
      //   ]),
      //   items: [
      //     {
      //       title: "Classification & Registration",
      //       url: "/classification-registration",
      //       isActive: pathname.startsWith("/classification-registration")
      //     },
      //     {
      //       title: "Provisional License (OTI)",
      //       url: "/provisional-license-oti",
      //       isActive: pathname.startsWith("/provisional-license-oti")
      //     },
      //     {
      //       title: "Provisional License (ODAI)",
      //       url: "/provisional-license-odai",
      //       isActive: pathname.startsWith("/provisional-license-odai")
      //     },
      //     {
      //       title: "Interim Authority (ODAI)",
      //       url: "/odai-interim-authority",
      //       isActive: pathname.startsWith("/odai-interim-authority")
      //     },
      //     {
      //       title: "Grant of a charter (ODAI)",
      //       url: "/grant-charter-odai",
      //       isActive: pathname.startsWith("/grant-charter-odai")
      //     },
      //     {
      //       title: "Interim Authority (University)",
      //       url: "/interim-authority",
      //       isActive: pathname.startsWith("/interim-authority")
      //     },
      //     {
      //       title: "Provisional License (University)",
      //       url: "/university-provisional-license",
      //       isActive: pathname.startsWith("/university-provisional-license")
      //     },
      //     {
      //       title: "Grant of a charter (University)",
      //       url: "/university-grant-charter",
      //       isActive: pathname.startsWith("/university-grant-charter")
      //     },
      //   ],
      // },
      // {
      //   title: "Programmes Accreditation",
      //   url: "#",
      //   icon: GraduationCap,
      //   isActive: isActiveRoute("#", [
      //     { title: "Accreditation Applications", url: "/accreditation-applications" }
      //   ]),
      //   items: [
      //     {
      //       title: "Accreditation Applications",
      //       url: "/accreditation-applications",
      //       isActive: pathname.startsWith("/accreditation-applications")
      //     },
      //   ],
      // },
      // {
      //   title: "Institution Affiliation",
      //   url: "#",
      //   icon: GraduationCap,
      //   isActive: isActiveRoute("#", [
      //     { title: "Affiliation Applications", url: "/affiliation-applications" }
      //   ]),
      //   items: [
      //     {
      //       title: "Affiliation Applications",
      //       url: "/affiliation-applications",
      //       isActive: pathname.startsWith("/affiliation-applications")
      //     },
      //   ],
      // },
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
            isActive: pathname.startsWith("/settings/password")
          },
          {
            title: "Manage Notifications",
            url: "/settings/notifications",
            isActive: pathname.startsWith("/settings/notifications")
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
  }

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
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}