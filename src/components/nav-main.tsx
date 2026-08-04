"use client";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const getSafeHref = (url: unknown) =>
  typeof url === "string" && url.trim().length > 0 ? url : "#";

function NavSubItem({ item }: { item: NavItem }) {
  const href = getSafeHref(item.url);

  if (!item.items?.length) {
    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild isActive={item.isActive}>
          <Link href={href}>
            <span>{item.title}</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  }

  return (
    <Collapsible asChild defaultOpen={item.isActive}>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild isActive={item.isActive} className="pr-8">
          <Link href={href}>
            <span>{item.title}</span>
          </Link>
        </SidebarMenuSubButton>
        <CollapsibleTrigger asChild>
          <SidebarMenuAction className="data-[state=open]:rotate-90">
            <ChevronRight />
            <span className="sr-only">Toggle</span>
          </SidebarMenuAction>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((nestedItem) => (
              <NavSubItem
                key={`${nestedItem.title}-${nestedItem.url}`}
                item={nestedItem}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuSubItem>
    </Collapsible>
  );
}

export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Services</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => {
          const href = getSafeHref(item.url);

          return (
            <Collapsible
              key={`${item.title}-${item.url}-${index}`}
              asChild
              defaultOpen={item.isActive}
            >
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={item.isActive}
                >
                  <Link href={href}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <NavSubItem
                            key={`${subItem.title}-${subItem.url}`}
                            item={subItem}
                          />
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
