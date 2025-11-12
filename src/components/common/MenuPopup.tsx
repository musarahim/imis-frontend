import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { MenuIcon } from "lucide-react";

import { BookOpenIcon, ChartBarSquareIcon, InboxIcon } from "@heroicons/react/24/solid";
import BuildingOfficeIcon from "@heroicons/react/24/solid/BuildingOfficeIcon";
import Link from "next/link";

const dashboardCards = [
  {
    title: 'Staff Portal',
    description: 'ILA, Staff Records, Payroll, Leave Management',
    icon: BuildingOfficeIcon,
    href: '/auth/login',
    color: 'bg-primary'
  },
  {
    title: 'Statistics & Reports',
    description: 'Login to Open Statistics and Reports Dashboard',
    icon: ChartBarSquareIcon,
    href: '/apps/statistics',
    color: 'bg-blue-700'
  },
  {
    title: 'Journal Administration',
    description: 'Access NCHE Open Journal System (OJS) for journal management',
    icon: BookOpenIcon,
    href: '/apps/ojs',
    color: 'bg-secondary'
  },
  {
    title: 'Staff Email',
    description: 'Manage staff, payroll, and organizational structure',
    icon: InboxIcon,
    href: '/hr',
    color: 'bg-orange-500'
  },
 
]

function MenuPopup() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="fixed right-0 m-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 z-50">
          <MenuIcon className="h-4 w-4" /> 
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-60" side="left">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Menu</h4>
          </div>
          <div className="grid gap-2  grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
                      {dashboardCards.map((card) => (
            <Link key={card.title} href={card.href}>
              <div className="group cursor-pointer transform transition-all duration-200 hover:scale-105">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 p-3 h-full flex flex-col items-center text-center">
                  <div className="flex justify-center items-center w-full ">
                    <div className={`${card.color} p-3 rounded-lg`}>
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                 
                </div>
              </div>
            </Link>
          ))}
           
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default MenuPopup