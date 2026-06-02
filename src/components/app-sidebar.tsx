"use client";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEmployeeData } from "@/hooks";
import {
    BookA,
    Building,
    FileBadge2,
    HomeIcon,
    LifeBuoy,
    Send,
    Settings2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { SidebarSkeleton } from "./sidebar-skeleton";

type Item = {
  title: string;
  url: string;
  icon?: React.ComponentType<Record<string, never>>;
  isActive?: boolean;
  requiredPermissions?: string[];
  requiredGroups?: string[];
  items?: Item[];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { user, isLoading } = useEmployeeData();

  // Function to check if a menu item is active
  const isActiveRoute = (url: string, items?: Item[]) => {
    if (url !== "#" && pathname === url) return true;
    if (items) {
      return items.some(
        (item) => item.url !== "#" && pathname.startsWith(item.url),
      );
    }
    return false;
  };
  // --- Build permission & group sets from user ---

  const userPermissions = React.useMemo(() => {
    if (!user || !user.groups) return new Set<string>();
    return new Set(
      user.groups.flatMap((g) => g.permissions?.map((p) => p.codename) || []),
    );
  }, [user]);

  const userGroups = React.useMemo(() => {
    if (!user || !user.groups) return new Set<string>();
    return new Set(user.groups.map((g) => g.name));
  }, [user]);

  const canSeeItem = (item: Item): boolean => {
    // If no requirements, everyone can see
    const requiredPerms: string[] = item.requiredPermissions ?? [];
    const requiredGroups: string[] = item.requiredGroups ?? [];

    // Check groups
    if (requiredGroups.length > 0) {
      const hasGroup = requiredGroups.some((g) => userGroups.has(g));
      if (!hasGroup) return false;
    }

    // Check permissions
    if (requiredPerms.length > 0) {
      const hasPerm = requiredPerms.some((p) => userPermissions.has(p));
      if (!hasPerm) return false;
    }

    return true;
  };

  const data = React.useMemo(
    () => ({
      navMain: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: HomeIcon,
          isActive: pathname === "/dashboard",
        },
        {
          title: "Leave",
          url: "#",
          icon: Building,
          isActive: isActiveRoute("#", [
            { title: "My Leave Schedule", url: "/leave/leave-schedule" },
            { title: "Leave Applications", url: "/leave/leave-applications" },
            { title: "My Leave", url: "/leave/my-leave" },
            { title: "Leave Delegations", url: "/leave/delegations" },
            {
              title: "Supervisor Leave Approvals",
              url: "/leave/approve-leave",
            },
          ]),
          requiredGroups: ["Staff"],
          items: [
            {
              title: "My Leave Schedule",
              url: "/leave/leave-schedule",
              isActive: pathname.startsWith("/leave/leave-schedule"),
              requiredPermissions: ["view_leaveapplication"],
            },
            {
              title: "Leave Applications",
              url: "/leave/leave-applications",
              isActive: pathname.startsWith("/leave/leave-applications"),
              requiredPermissions: ["view_leaveapplication"],
            },

            {
              title: "Leave Delegations",
              url: "/leave/delegations",
              isActive: pathname.startsWith("/leave/delegations"),
              requiredPermissions: ["view_leaveapplication"],
            },
            {
              title: "Supervisor Leave Approvals",
              url: "/leave/supervisor-approvals",
              isActive: pathname.startsWith("/leave/supervisor-approvals"),
              requiredPermissions: ["can_approve_leave"],
            },
            {
              title: "Director Leave Approvals",
              url: "/leave/director-approvals",
              isActive: pathname.startsWith("/leave/director-approvals"),
              requiredPermissions: ["director_approve_leave"],
            },
            {
              title: "HR Leave Approvals",
              url: "/leave/hr-approvals",
              isActive: pathname.startsWith("/leave/hr-approvals"),
              requiredPermissions: ["hr_approve_leave"],
            },
          ],
        },
        {
          title: "Programme Accreditation",
          url: "#",
          icon: BookA,
          isActive: isActiveRoute("#", [
            {
              title: "Programme Accreditation",
              url: "/programmes/programme-accreditation",
            },
            {
              title: "Applications Under Review",
              url: "/programmes/under-review",
            },
            {
              title: "Applications Reviews",
              url: "/programmes/reviewed-applications",
            },
            { title: "Under Assessment", url: "/programmes/under-assessment" },
            {
              title: "Programme Assessments",
              url: "/programmes/programme-assessments",
            },
            {
              title: "Directorate Applications",
              url: "/programmes/directorate-applications",
            },
            {
              title: "Progressed to Management",
              url: "/programmes/progressed-to-management",
            },
            {
              title: "Applications Ready for Invoicing",
              url: "/programmes/applications-ready-for-invoicing",
            },
            {
              title: "Invoiced Applications",
              url: "/programmes/invoiced-applications",
            },
            {
              title: "Management Review",
              url: "/programmes/management-review",
            },
          ]),
          requiredGroups: [
            "Head Programme Accreditation",
            "Programme Reviewers",
            "Finance Officer",
            "Management",
          ],
          items: [
            {
              title: "Submitted Applications",
              url: "/programmes/programme-accreditation",
              isActive: pathname.startsWith(
                "/programmes/programme-accreditation",
              ),
              requiredPermissions: ["can_assign_reviewers"],
            },
            {
              title: "Applications Under Review",
              url: "/programmes/under-review",
              isActive: pathname.startsWith("/programmes/under-review"),
              requiredPermissions: [
                "can_assign_reviewers",
                "can_review_programme_accreditation",
              ],
            },
            {
              title: "Reviewed Applications",
              url: "/programmes/reviewed-applications",
              isActive: pathname.startsWith(
                "/programmes/reviewed-applications",
              ),
              requiredPermissions: [
                "can_assign_reviewers",
                "can_review_programme_accreditation",
              ],
            },
            {
              title: "Applications Ready for Invoicing",
              url: "/programmes/applications-ready-for-invoicing",
              isActive: pathname.startsWith(
                "/programmes/applications-ready-for-invoicing",
              ),
              requiredPermissions: ["can_manage_invoices"],
            },
            {
              title: "Under Assessment",
              url: "/programmes/under-assessment",
              isActive: pathname.startsWith("/programmes/under-assessment"),
              requiredPermissions: ["can_assess_programme"],
            },
            {
              title: "Programme Assessments",
              url: "/programmes/programme-assessments",
              isActive: pathname.startsWith(
                "/programmes/programme-assessments",
              ),
              requiredPermissions: ["can_assess_programme"],
            },
            {
              title: "Directorate Decisions",
              url: "/programmes/directorate-applications",
              isActive: pathname.startsWith(
                "/programmes/directorate-applications",
              ),
              requiredPermissions: ["can_make_directorate_decision"],
            },
            {
              title: "Progressed to Management",
              url: "/programmes/progressed-to-management",
              isActive: pathname.startsWith(
                "/programmes/progressed-to-management",
              ),
              requiredPermissions: ["can_make_directorate_decision"],
            },
            {
              title: "Application Invoices",
              url: "/programmes/application-invoices",
              isActive: pathname.startsWith("/programmes/application-invoices"),
              requiredPermissions: [
                "can_manage_invoices",
                "add_programmeinvoice",
                "change_programmeinvoice",
                "view_programmeinvoice ",
              ],
            },
            {
              title: "Management Review",
              url: "/programmes/management-review",
              isActive: pathname.startsWith("/programmes/management-review"),
              requiredPermissions: [
                "can_approve_programme_at_management_level",
              ],
            },
            {
              title: "Preliminary Reviews",
              url: "/programmes/preliminary-reviews",
              isActive: pathname.startsWith("/programmes/preliminary-reviews"),
              requiredPermissions: [
                "can_assign_reviewers",
                "can_review_programme_accreditation",
              ],
            },
          ],
        },

        {
          title: "Institutional Licensing",
          url: "#",
          icon: FileBadge2,
          isActive: isActiveRoute("#", [
            {
              title: "Institutional Licensing",
              url: "/license/institutional-licensing",
            },
            {
              title: "Applications Under Review",
              url: "/license/under-review",
            },
            {
              title: "Applications Reviews",
              url: "/license/reviewed-applications",
            },
            { title: "Under Assessment", url: "/license/under-assessment" },
          ]),
          requiredGroups: [
            "Head of Department(ILA)",
            "ILA Desk Review Officer",
            "Director QA",
          ],
          items: [
            {
              title: "Interim Authority (University)",
              url: "#",
              isActive: pathname.startsWith("/license/institutional-licensing"),
              requiredGroups: [
                "Head of Department(ILA)",
                "ILA Desk Review Officer",
                "Director QA",
              ],
              items: [
                {
                  title: "Submitted",
                  url: "/license/university/interim-authority/submitted",
                  isActive: pathname.startsWith(
                    "/license/university/interim-authority/submitted",
                  ),
                  requiredPermissions: [
                    "can_assign_interim_authority_reviewer",
                  ],
                },
                {
                  title: "Under Review",
                  url: "/license/university/interim-authority/under-review",
                  isActive: pathname.startsWith(
                    "/license/university/interim-authority/under-review",
                  ),
                  requiredPermissions: [
                    "can_assign_reviewers",
                    "can_review_institutional_licensing",
                  ],
                },
              ],
            },
            {
              title: "Provisional License (University)",
              url: "#",
              isActive: pathname.startsWith(
                "/license/university/provisional-license",
              ),
              requiredPermissions: ["can_assign_reviewers"],
              items: [
                {
                  title: "Submitted",
                  url: "/license/university/provisional-license/submitted",
                  isActive: pathname.startsWith(
                    "/license/university/provisional-license/submitted",
                  ),
                  requiredPermissions: [
                    "can_assign_reviewers",
                    "can_review_institutional_licensing",
                  ],
                },
                {
                  title: "Under Review",
                  url: "/license/university/provisional-license/under-review",
                  isActive: pathname.startsWith(
                    "/license/university/provisional-license/under-review",
                  ),
                  requiredPermissions: [
                    "can_assign_reviewers",
                    "can_review_institutional_licensing",
                  ],
                },
              ],
            },
            {
              title: "Charter (University)",
              url: "#",
              isActive: pathname.startsWith("/license/university/charter"),
              requiredPermissions: ["can_assign_reviewers"],
              items: [
                {
                  title: "Submitted",
                  url: "/license/university/charter/submitted",
                  isActive: pathname.startsWith(
                    "/license/university/charter/submitted",
                  ),
                  requiredPermissions: [
                    "can_assign_reviewers",
                    "can_review_institutional_licensing",
                  ],
                },
                {
                  title: "Under Review",
                  url: "/license/university/charter/under-review",
                  isActive: pathname.startsWith(
                    "/license/university/charter/under-review",
                  ),
                  requiredPermissions: [
                    "can_assign_reviewers",
                    "can_review_institutional_licensing",
                  ],
                },
              ],
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
    [pathname, isActiveRoute],
  );

  // --- Filter menu based on permissions/groups ---
  const filteredNavMain = React.useMemo(() => {
    const filterItems = (items: Item[]): Item[] => {
      return items.reduce<Item[]>((acc, item) => {
        const childItems = item.items ? filterItems(item.items) : [];

        // Keep parent if it is visible itself or has visible descendants.
        const isVisible = canSeeItem(item) || childItems.length > 0;
        if (!isVisible) return acc;

        acc.push({
          ...item,
          items: childItems,
        });

        return acc;
      }, []);
    };

    return filterItems(data.navMain);
  }, [data.navMain, userPermissions, userGroups, canSeeItem]);

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
        {isLoading ? (
          <SidebarSkeleton />
        ) : (
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
  );
}
