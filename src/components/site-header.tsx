"use client"

import { ModeToggle } from "@/components/common/dark-mode-toggle"
import { NavUser } from "@/components/nav-user"
import { SearchForm } from "@/components/search-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { SidebarIcon } from "lucide-react"
import { usePathname } from "next/navigation"

type Crumb = {
  label: string
  href?: string
}

type SiteHeaderProps = {
  items?: Crumb[]
}



function labelize(segment: string) {
  const s = decodeURIComponent(segment).replace(/-/g, " ")
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function SiteHeader({ items }: SiteHeaderProps) {
  const { toggleSidebar } = useSidebar()
  const pathname = usePathname()

  // If no items passed, generate from URL
  const segments = (pathname ?? "/").split("/").filter(Boolean)
  const autoCrumbs: Crumb[] = [
    { label: "Home", href: "/" },
    ...segments.map((seg, i) => {
      const href = "/" + segments.slice(0, i + 1).join("/")
      const isLast = i === segments.length - 1
      return { label: labelize(seg), href: isLast ? undefined : href }
    }),
  ]

  const crumbs = items ?? autoCrumbs

  return (
    <header className="bg-gray-200 dark:bg-gray-900 sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>

        <Separator orientation="vertical" className="mr-2 h-4" />

        {/* Dynamic or manual breadcrumb */}
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            {crumbs.map((c, i) => {
              const isLast = i === crumbs.length - 1
              return (
                <span key={`${c.label}-${i}`} className="inline-flex items-center">
                  <BreadcrumbItem>
                    {isLast || !c.href ? (
                      <BreadcrumbPage>{c.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={c.href}>{c.label}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </span>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
        <ModeToggle />
        <div className="inline-flex w-auto">
          <NavUser />
        </div>
      </div>
    </header>
  )
}
