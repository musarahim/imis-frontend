"use client";
import { MobileNavigation, SideNavigation, UserMenu } from '@/components';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild
} from '@headlessui/react';
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

import { useState } from 'react';
const navigation: NavItem[] = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Classification & Registration', href: '#', icon: UsersIcon },
  { name: 'Provisional License (OTI)', href: '#', icon: FolderIcon, current: false },
  { name: 'Provisional License (ODA)', href: '#', icon: CalendarIcon, current: false },
  { name: 'Interim Authority (ODA', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Grant of a charter (ODAI)', href: '#', icon: ChartPieIcon, current: false },
  { name: 'Interim Authority (University)', href: '/interim-authority', icon: ChartPieIcon },
   { name: 'Provisional License (University)', href: '#', icon: CalendarIcon, current: false },
   { name: 'Grant of a charter (University)', href: '#', icon: ChartPieIcon, current: false },
   { name: 'Program Accreditation', href: '#', icon: ChartPieIcon, current: false },
   { name: 'Institution Affiliation', href: '#', icon: ChartPieIcon, current: false },
   { name: 'Self Assessment Report', href: '#', icon: ChartPieIcon, current: false },
   {
       name: 'Projects',
       icon: FolderIcon,
       current: false,
       href: '#',
       children: [
         { name: 'GraphQL API', href: '#', current:false },
         { name: 'iOS App', href: '#', current:false },
         { name: 'Android App', href: '#', current:false },
         { name: 'New Customer Portal', href: '#', current:false },
       ],
     },
]

function AppMenu() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
    
   
  return (
    <>
   <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
              <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
              />
    
              <div className="fixed inset-0 flex">
                <DialogPanel
                  transition
                  className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
                >
                  <TransitionChild>
                    <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                      <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                      </button>
                    </div>
                  </TransitionChild>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sky-800  pb-4">
                    <div className="flex h-16 shrink-0 items-center pb-8 pt-4 mt-4">
                      <Image
                        height={500}
                        width={500}
                        alt="NCHE IMIS"
                        src="/images/logo.png"
                        className=" bg-white"
                      />
                    </div>
                     {/* mobile navigation */}
                     <MobileNavigation navigation={navigation} />
                  </div>
                </DialogPanel>
              </div>
            </Dialog>
    
            {/* Static sidebar for desktop */}
            <SideNavigation navigation={navigation}  />
              <div className="lg:pl-72">
              <UserMenu  setSidebarOpen={()=>setSidebarOpen(true)} />
                
    </div>
    </>
  )
}

export default AppMenu