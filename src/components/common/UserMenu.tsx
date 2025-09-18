"use client";
import { useLogoutMutation, useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { logout as setLogout } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, BellIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

interface UserMenuProps {
  setSidebarOpen: (open: boolean) => void;
}

function UserMenu({ setSidebarOpen }: UserMenuProps) {
  const dispatch = useAppDispatch();
 const [logout] = useLogoutMutation();
 const {data: user} = useRetrieveUserQuery();
 const handleLogout = () => {
  logout(undefined).unwrap().then(() => {
    dispatch(setLogout());
  });
 }
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
     
                    <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                      <span className="sr-only">Open sidebar</span>
                      <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                    <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                      <span className="sr-only">Open sidebar</span>
                      <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                 
                    {/* Separator */}
                    <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />
        
                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                      <div  className="grid flex-1 grid-cols-1">

                      
                      </div>
                      <div className="flex items-center gap-x-4 lg:gap-x-6">
                        <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">View notifications</span>
                          <BellIcon aria-hidden="true" className="size-6" />
                        </button>
                        
                        {/* Separator */}
                        <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />
        
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative">
                          <MenuButton className="-m-1.5 flex items-center p-1.5">
                            <span className="sr-only">Open user menu</span>
                            <Image
                              width={32}
                              height={32}
                              alt=""
                              src={user?.profile_pic ?? "/images/user.jpg"}
                              className="size-8 rounded-full bg-gray-50"
                            />
                            <span className="hidden lg:flex lg:items-center">
                              <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-900">
                                {user?.username} 
                              </span>
                              <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-400" />
                            </span>
                          </MenuButton>
                          <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 ring-1 shadow-lg ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                          >
                            
                              <MenuItem key={"profile"}>
                                <Link
                                  href={"/profile"}
                                  className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                >
                                  Your profile
                                </Link>
                              </MenuItem>
                              <MenuItem key={"logout"}>
                                <Link
                                  href={"#"}
                                  className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                  onClick={handleLogout}
                                >
                                  Sign out
                                </Link>
                              </MenuItem>
                        
                          </MenuItems>
                        </Menu>
                      </div>
                    </div>
                  </div>
  )
}

export default UserMenu