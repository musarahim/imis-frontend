import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import cn from 'classnames';

function MobileNavigation({navigation}: {navigation: NavItem[]}) {
  return (
    <nav className="flex flex-1 flex-col px-6 mt-3">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                              <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                  {navigation.map((item) => (
                                    <li key={item.name}>
                                      {!item.children ? (
                                        <a
                                          href={item.href}
                                          className={cn(
                                            item.current ? 'bg-sky-900' : 'hover:bg-sky-900',
                                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-white',
                                          )}
                                        >
                                          <item.icon aria-hidden="true" className="size-6 shrink-0 text-gray-50" />
                                          {item.name}
                                        </a>
                                      ) : (
                                        <Disclosure as="div">
                                          <DisclosureButton
                                            className={cn(
                                              item.current ? 'bg-sky-900' : 'hover:bg-sky-900',
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
                                                    subItem.current ? 'bg-sky-900' : 'hover:bg-sky-900',
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
                              <li className="-mx-6 mt-auto">
                                <a
                                  href="#"
                                  className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-sky-900"
                                >
                                  <img
                                    alt=""
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    className="size-8 rounded-full bg-gray-50"
                                  />
                                  <span className="sr-only">Your profile</span>
                                  <span aria-hidden="true">Tom Cook</span>
                                </a>
                              </li>
                            </ul>
                          </nav>
  )
}

export default MobileNavigation