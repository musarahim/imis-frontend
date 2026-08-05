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
    ShoppingBag,
    Users2,
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
  isVisible?: boolean;
  items?: Item[];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { user, employee, isLoading } = useEmployeeData();

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

  const designationName = employee?.designation_name?.toLowerCase() || "";
  const groupNamesLower = React.useMemo(
    () => Array.from(userGroups).map((g) => g.toLowerCase()),
    [userGroups],
  );

  const hasAnyPermission = React.useCallback(
    (permissions: string[]) => permissions.some((p) => userPermissions.has(p)),
    [userPermissions],
  );

  const isExecutiveDirector =
    designationName.includes("executive director") ||
    groupNamesLower.some((g) => g.includes("executive director"));

  const isDirector =
    !isExecutiveDirector &&
    (designationName.includes("director") ||
      groupNamesLower.some((g) => g.includes("director")));

  const isReviewer =
    designationName.includes("reviewer") ||
    groupNamesLower.some((g) => g.includes("reviewer")) ||
    hasAnyPermission(["can_review_appraisal", "can_review_staff_appraisal"]);

  const isAppraiser =
    designationName.includes("supervisor") ||
    designationName.includes("manager") ||
    designationName.includes("head") ||
    designationName.includes("director") ||
    hasAnyPermission([
      "manage_employee",
      "can_approve_staff_appraisal",
      "can_appraise_staff",
    ]);

  const canSeeAppraiserMenu = isAppraiser;
  const canSeeReviewerMenu = isReviewer;
  const canSeeDirectorMenu = isDirector;
  const canSeeExecutiveMenu = isExecutiveDirector;

  const directorateLabel = employee?.directorate_name
    ? `${employee.directorate_name} Directorate`
    : "Your Directorate";

  const canSeeItem = (item: Item): boolean => {
    if (item.isVisible === false) {
      return false;
    }

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
          title: "Human Resource Management",
          url: "#",
          icon: Users2,
          isActive: isActiveRoute("#", [
            { title: "Employees", url: "/hr/employees" },
          ]),
          requiredGroups: ["Human Resource"],
          items: [
            {
              title: "Employees",
              url: "/hr/employees",
              isActive: pathname.startsWith("/hr/employees"),
              requiredPermissions: ["manage_employee"],
            },
          ],
        },

        {
          title: "Performance Appraisal",
          url: "#",
          icon: FileBadge2,
          isActive: isActiveRoute("#", [
            { title: "My Appraisals", url: "/hr/performance_appraisal" },
            {
              title: "Appraiser Reviews",
              url: "/hr/performance_appraisal/appraiser-reviews",
            },
            {
              title: "Reviewer Reviews",
              url: "/hr/performance_appraisal/reviewer-reviews",
            },
            {
              title: "Director Reviews",
              url: "/hr/performance_appraisal/director-reviews",
            },
            {
              title: "Executive Director Reviews",
              url: "/hr/performance_appraisal/executive-reviews",
            },
          ]),
          requiredGroups: ["Staff"],
          items: [
            {
              title: "My Appraisals",
              url: "/hr/performance_appraisal",
              isActive:
                pathname === "/hr/performance_appraisal" ||
                pathname.startsWith("/hr/performance_appraisal/new"),
            },
            {
              title: "Appraiser Reviews",
              url: "/hr/performance_appraisal/appraiser-reviews",
              isActive: pathname.startsWith(
                "/hr/performance_appraisal/appraiser-reviews",
              ),
              isVisible: canSeeAppraiserMenu,
            },
            {
              title: "Reviewer Reviews",
              url: "/hr/performance_appraisal/reviewer-reviews",
              isActive: pathname.startsWith(
                "/hr/performance_appraisal/reviewer-reviews",
              ),
              isVisible: canSeeReviewerMenu,
            },
            {
              title: `Director Reviews (${directorateLabel})`,
              url: "/hr/performance_appraisal/director-reviews",
              isActive: pathname.startsWith(
                "/hr/performance_appraisal/director-reviews",
              ),
              isVisible: canSeeDirectorMenu,
            },
            {
              title: "Executive Director Reviews",
              url: "/hr/performance_appraisal/executive-reviews",
              isActive: pathname.startsWith(
                "/hr/performance_appraisal/executive-reviews",
              ),
              isVisible: canSeeExecutiveMenu,
            },
          ],
        },
        {
          title: "Procurement",
          url: "#",
          icon: ShoppingBag,
          isActive: isActiveRoute("#", [
            { title: "Procurement Items", url: "/procurement/items" },
            { title: "Budget", url: "/procurement/budget" },
            { title: "Expenditure", url: "/procurement/expenditure" },
            { title: "Procurement Reports", url: "/procurement/reports" },
          ]),
          requiredGroups: ["Procurement Officer"],
          items: [
            {
              title: "Items",
              url: "/procurement/items",
              isActive: pathname.startsWith("/procurement/items"),
              requiredPermissions: ["view_procurementitem"],
            },
            {
              title: "Budgets",
              url: "/procurement/budget",
              isActive: pathname.startsWith("/procurement/budget"),
              requiredPermissions: ["view_procurementbudget"],
            },

            {
              title: "Expenditures",
              url: "/procurement/expenditure",
              isActive: pathname.startsWith("/procurement/expenditure"),
              requiredPermissions: ["view_procurementexpenditure"],
            },
            {
              title: "Procurement Reports",
              url: "/procurement/reports",
              isActive: pathname.startsWith("/procurement/reports"),
              requiredPermissions: ["view_procurementreports"],
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
            {
              title: "Ready for Assessment",
              url: "/programmes/ready-for-assessment",
              isActive: pathname.startsWith("/programmes/ready-for-assessment"),
              requiredPermissions: [
                "can_assign_reviewers",
                "can_review_programme_accreditation",
              ],
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
              title: "Desk Review Invoices",
              url: "/programmes/desk-review-invoices",
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
              title: "Ready for Assessment",
              url: "/programmes/ready-for-assessment",
              isActive: pathname.startsWith("/programmes/ready-for-assessment"),
              requiredPermissions: [
                "can_assign_reviewers",
                "can_review_programme_accreditation",
              ],
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
              title: "Administrative Visit Invoices",
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
              title: "Desk Review Invoices",
              url: "/programmes/desk-review-invoices",
              isActive: pathname.startsWith("/programmes/desk-review-invoices"),
              requiredPermissions: [
                "add_programmeassessmentinvoice",
                "change_programmeassessmentinvoice",
                "delete_programmeassessmentinvoice",
                "view_programmeassessmentinvoice",
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
            //odai interim authority
            {
              title: "Interim Authority (ODAI)",
              url: "#",
              isActive: pathname.startsWith(
                "/license/odai/interim-authority/submitted",
              ),
              requiredPermissions: ["can_assign_reviewers"],
              items: [
                {
                  title: "Submitted",
                  url: "/license/odai/interim-authority/submitted",
                  isActive: pathname.startsWith(
                    "/license/odai/interim-authority/submitted",
                  ),
                  requiredPermissions: [
                    "can_assign_reviewers",
                    "can_review_institutional_licensing",
                  ],
                },
                {
                  title: "Under Review",
                  url: "/license/odai/interim-authority/under-review",
                  isActive: pathname.startsWith(
                    "/license/odai/interim-authority/under-review",
                  ),
                  requiredPermissions: [
                    "can_assign_reviewers",
                    "can_review_institutional_licensing",
                  ],
                },
              ],
            },
            //odai provisional license
            {
              title: "Provisional License (ODAI)",
              url: "#",
              isActive: pathname.startsWith(
                "/license/odai/provisional-license/submitted",
              ),
              requiredPermissions: ["can_assign_reviewers"],
              items: [
                {
                  title: "Submitted",
                  url: "/license/odai/provisional-license/submitted",
                  isActive: pathname.startsWith(
                    "/license/odai/provisional-license/submitted",
                  ),
                  requiredPermissions: [
                    "can_assign_reviewers",
                    "can_review_institutional_licensing",
                  ],
                },
                {
                  title: "Under Review",
                  url: "/license/odai/provisional-license/under-review",
                  isActive: pathname.startsWith(
                    "/license/odai/provisional-license/under-review",
                  ),
                  requiredPermissions: [
                    "can_assign_reviewers",
                    "can_review_institutional_licensing",
                  ],
                },
              ],
            },
            {
              title: "Charter (ODAI)",
              url: "#",
              isActive: pathname.startsWith("/license/odai/charter/submitted"),
              requiredPermissions: ["can_assign_reviewers"],
              items: [
                {
                  title: "Submitted",
                  url: "/license/odai/charter/submitted",
                  isActive: pathname.startsWith(
                    "/license/odai/charter/submitted",
                  ),
                  requiredPermissions: [
                    "can_assign_reviewers",
                    "can_review_institutional_licensing",
                  ],
                },
                {
                  title: "Under Review",
                  url: "/license/odai/charter/under-review",
                  isActive: pathname.startsWith(
                    "/license/odai/charter/under-review",
                  ),
                  requiredPermissions: [
                    "can_assign_reviewers",
                    "can_review_institutional_licensing",
                  ],
                },
              ],
            },
            //provisional license OTI

            {
              title: "Provisional License (OTI)",
              url: "#",
              isActive: pathname.startsWith(
                "/license/oti/provisional-license/submitted",
              ),
              requiredPermissions: ["can_assign_reviewers"],
              items: [
                {
                  title: "Submitted",
                  url: "/license/oti/provisional-license/submitted",
                  isActive: pathname.startsWith(
                    "/license/oti/provisional-license/submitted",
                  ),
                  requiredPermissions: [
                    "can_assign_reviewers",
                    "can_review_institutional_licensing",
                  ],
                },
                {
                  title: "Under Review",
                  url: "/license/oti/provisional-license/under-review",
                  isActive: pathname.startsWith(
                    "/license/oti/provisional-license/under-review",
                  ),
                  requiredPermissions: [
                    "can_assign_reviewers",
                    "can_review_institutional_licensing",
                  ],
                },
              ],
            },
            //classification and registration
            {
              title: "Classification and Registration",
              url: "#",
              isActive: pathname.startsWith(
                "/license/oti/classification-registration/submitted",
              ),
              requiredPermissions: ["can_assign_reviewers"],
              items: [
                {
                  title: "Submitted",
                  url: "/license/oti/classification-registration/submitted",
                  isActive: pathname.startsWith(
                    "/license/oti/classification-registration/submitted",
                  ),
                  requiredPermissions: [
                    "can_assign_reviewers",
                    "can_review_institutional_licensing",
                  ],
                },
                {
                  title: "Under Review",
                  url: "/license/oti/classification-registration/under-review",
                  isActive: pathname.startsWith(
                    "/license/oti/classification-registration/under-review",
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
    [
      pathname,
      isActiveRoute,
      directorateLabel,
      canSeeAppraiserMenu,
      canSeeReviewerMenu,
      canSeeDirectorMenu,
      canSeeExecutiveMenu,
    ],
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
