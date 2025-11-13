
import { ModeToggle } from "@/components/common/dark-mode-toggle"

import { SidebarInset } from "@/components/ui/sidebar"
import { BookOpenIcon, ChartBarSquareIcon, InboxIcon } from "@heroicons/react/24/solid"
import BuildingOfficeIcon from "@heroicons/react/24/solid/BuildingOfficeIcon"
import Link from "next/link"



const dashboardCards = [
  {
    title: 'Staff Portal',
    description: 'ILA, Staff Records, Payroll, Leave Management',
    icon: BuildingOfficeIcon,
    href: '/dashboard',
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


export default function Home() {

  
 
  return (
   

             <>
     <header className="bg-secondary dark:bg-gray-900 sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <span className="text-left ms-4 text-gray-50 font-bold">NCHE Integrated Information Management System</span>
        <div className="w-full sm:ml-auto sm:w-auto flex items-start gap-4 text-left">
          
          </div>
        
        <ModeToggle />
        
      </div>
    </header>
         
         <div className="flex flex-1">
             
              <SidebarInset>
     
    <div className="py-4 sm:py-16 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <div className="col-span-2">
            <h2 className="text-2xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white sm:text-3xl">
            Integrated Management Information System (IMIS)
          </h2>
          <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300 max-w-3xl lg:mx-0">
          A comprehensive system designed to streamline operations, improve decision-making capabilities, and enhance transparency and accountability for the National Council for Higher Education (NCHE) regulatory processes.
          </p>
          </div>

          <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
           {dashboardCards.map((card) => (
            <Link key={card.title} href={card.href}>
              <div className="group cursor-pointer transform transition-all duration-200 hover:scale-105">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 p-6 h-full flex flex-col items-center text-center">
                  <div className="flex justify-center mb-4">
                    <div className={`${card.color} p-3 rounded-lg`}>
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                    {card.description}
                  </p>
                  <div className="mt-auto flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                    <span>Login</span>
                    <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          </dl>
        </div>
      </div>
    </div>
          
        
              </SidebarInset>
        
            </div>
            
              
             </>
  );
}




