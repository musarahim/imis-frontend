"use client";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


function SideNavigation({navigation}: {navigation: NavItem[]}) {
  const pathname = usePathname();
  const current = navigation.find((nav)=> nav.href === pathname)
  console.log({ href: current?.href}, "current")
  console.log(pathname)
  return (
     
 <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sky-800  pb-4">
                <div className="flex h-16 shrink-0 items-center pb-8 pt-4 mt-4">
                  <Image
                    width={290}
                    height={40}
                    alt="UNCHE IMIS"
                    src="/images/logo.png"
                    className=" bg-white"
                  />
                </div>
                <nav className="flex flex-1 flex-col px-6 mt-2">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                          <li>
                            <ul role="list" className="-mx-2 space-y-1">
                              {navigation.map((item) => (
                                <li key={item.name}>
                                  {!item.children ? (
                                    <Link
                                      href={item.href}
                                      className={cn(
                                        pathname === item.href ? 'bg-sky-900' : 'hover:bg-sky-900',
                                        'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-white',
                                      )}
                                    >
                                      <item.icon aria-hidden="true" className="size-6 shrink-0 text-gray-50" />
                                      {item.name}
                                    </Link>
                                  ) : (
                                    <Disclosure as="div">
                                      <DisclosureButton
                                        className={cn(
                                          pathname === item.href ? 'bg-sky-900' : 'hover:bg-sky-900',
                                          'group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm/6 font-semibold text-white',
                                        )}
                                      >
                                        <item.icon aria-hidden="true" className="size-6 shrink-0 text-white" />
                                        {item.name}
                                        <ChevronRightIcon
                                          aria-hidden="true"
                                          className="ml-auto size-5 shrink-0 text-gray-100 group-data-open:rotate-90 group-data-open:text-gray-50"
                                        />
                                      </DisclosureButton>
                                      <DisclosurePanel as="ul" className="mt-1 px-2">
                                        {item.children.map((subItem) => (
                                          <li key={subItem.name}>
                                            {/* 44px */}
                                            <DisclosureButton
                                              as="a"
                                              href={subItem.href}
                                              className={cn(
                                                pathname === subItem.href ? 'bg-sky-900' : 'hover:bg-sky-900',
                                                'block rounded-md py-2 pr-2 pl-9 text-sm/6 text-white',
                                              )}
                                            >
                                              {subItem.name}
                                            </DisclosureButton>
                                          </li>
                                        ))}
                                      </DisclosurePanel>
                                    </Disclosure>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </li>
                          
                        </ul>
                      </nav>
              </div>
            </div>
            
  )
}

export default SideNavigation