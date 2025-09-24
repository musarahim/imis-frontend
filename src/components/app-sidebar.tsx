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
  BookOpen,
  Building,
  Frame,
  GraduationCap,
  HomeIcon,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

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
      isActive: true
    },
    
    {
      title: "Institution",
      url: "#",
      icon: Building,
      isActive: true,
      items: [
        {
          title: "Institution Details",
          url: "#",
        },
        {
          title: "Programmes",
          url: "#",
        },
        {
          title: "Licenses",
          url: "#",
        },
        {
          title: "Our Programmes",
          url: "#",
        },
      ],
    },
    {
      title: "License Applications",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Classification & Registration",
          url: "#",
        },
        {
          title: "Provisional License (OTI)",
          url: "#",
        },
        {
          title: "Provisional License (ODAI)",
          url: "#",
        },
        {
          title: "Interim Authority (ODAI)",
          url: "#",
        },
        {
          title: "Grant of a charter (ODAI)",
          url: "#",
        },
        {
          title: "Interim Authority (University)'",
          url: "/interim-authority",
        },
        {
          title: "Provisional License (University)",
          url: "#",
        },
        {
          title: "Grant of a charter (University)",
          url: "#",
        },
        
      ],
    },
    {
      title: "Programmes Accreditation",
      url: "#",
      icon: GraduationCap,
      items: [
        {
          title: "Accreditation Applications",
          url: "#",
        },
       
      ],
    },
    {
      title: "Institution Affiliation",
      url: "#",
      icon: GraduationCap,
      items: [
        {
          title: "Accreditation Applications",
          url: "#",
        },
       
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
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
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                className="object-cover bg-white rounded-lg  w-full"
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
        <NavUser  />
      </SidebarFooter>
    </Sidebar>
  )
}
