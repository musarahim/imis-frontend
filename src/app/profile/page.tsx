import { AppMenu } from '@/components';
import { RequireAuth } from '@/utils';

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/react';
import {
  CalendarDaysIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  UserCircleIcon
} from '@heroicons/react/20/solid';
const invoice = {
  subTotal: '$8,800.00',
  tax: '$1,760.00',
  total: '$10,560.00',
  items: [
    {
      id: 1,
      title: 'Logo redesign',
      description: 'New logo and digital asset playbook.',
      hours: '20.0',
      rate: '$100.00',
      price: '$2,000.00',
    },
    {
      id: 2,
      title: 'Website redesign',
      description: 'Design and program new company website.',
      hours: '52.0',
      rate: '$100.00',
      price: '$5,200.00',
    },
   
   
  ],
}



function page() {
  return (
  <RequireAuth>
         <AppMenu />
            {/* Main content */}
    
            <div className="flex flex-col lg:pl-72">
              <main className="py-10">
                <div className="px-4 sm:px-6 lg:px-8">
                {/* start content */}
                 <>
                    
                
                      <main>
                        <header className="relative isolate pt-5">
                          
                
                          <div className="mx-auto max-w-7xl px-4 py-0 sm:px-6 lg:px-8">
                            <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
                              <div className="flex items-center gap-x-6">
                                <img
                                  alt=""
                                  src="https://tailwindui.com/plus-assets/img/logos/48x48/tuple.svg"
                                  className="size-16 flex-none rounded-full ring-1 ring-gray-900/10"
                                />
                                <h1>
                                  <div className="text-sm/6 text-gray-500">
                                    Invoice <span className="text-gray-700">#00011</span>
                                  </div>
                                  <div className="mt-1 text-base font-semibold text-gray-900">Tuple, Inc</div>
                                </h1>
                              </div>
                              <div className="flex items-center gap-x-4 sm:gap-x-6">
                                <a
                                  href="#"
                                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  Edit
                                </a>
                
                                <Menu as="div" className="relative sm:hidden">
                                  <MenuButton className="-m-3 block p-3">
                                    <span className="sr-only">More</span>
                                    <EllipsisVerticalIcon aria-hidden="true" className="size-5 text-gray-500" />
                                  </MenuButton>
                
                                  <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 ring-1 shadow-lg ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                  >
                                  
                                    <MenuItem>
                                      <a
                                        href="#"
                                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                      >
                                        Edit
                                      </a>
                                    </MenuItem>
                                  </MenuItems>
                                </Menu>
                              </div>
                            </div>
                          </div>
                        </header>
                
                        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                          <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                            {/* Invoice summary */}
                            <div className="lg:col-start-3 lg:row-end-1">
                              <h2 className="sr-only">Summary</h2>
                              <div className="rounded-lg bg-gray-50 ring-1 shadow-xs ring-gray-900/5">
                                <dl className="flex flex-wrap">
                                  <div className="flex-auto pt-6 pl-6">
                                    <dt className="text-sm/6 font-semibold text-gray-900">Amount</dt>
                                    <dd className="mt-1 text-base font-semibold text-gray-900">$10,560.00</dd>
                                  </div>
                                  <div className="flex-none self-end px-6 pt-4">
                                    <dt className="sr-only">Status</dt>
                                    <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-green-600/20 ring-inset">
                                      Paid
                                    </dd>
                                  </div>
                                  <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                                    <dt className="flex-none">
                                      <span className="sr-only">Client</span>
                                      <UserCircleIcon aria-hidden="true" className="h-6 w-5 text-gray-400" />
                                    </dt>
                                    <dd className="text-sm/6 font-medium text-gray-900">Alex Curren</dd>
                                  </div>
                                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                    <dt className="flex-none">
                                      <span className="sr-only">Due date</span>
                                      <CalendarDaysIcon aria-hidden="true" className="h-6 w-5 text-gray-400" />
                                    </dt>
                                    <dd className="text-sm/6 text-gray-500">
                                      <time dateTime="2023-01-31">January 31, 2023</time>
                                    </dd>
                                  </div>
                                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                    <dt className="flex-none">
                                      <span className="sr-only">Status</span>
                                      <CreditCardIcon aria-hidden="true" className="h-6 w-5 text-gray-400" />
                                    </dt>
                                    <dd className="text-sm/6 text-gray-500">Paid with MasterCard</dd>
                                  </div>
                                </dl>
                                <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                                  <a href="#" className="text-sm/6 font-semibold text-gray-900">
                                    Download receipt <span aria-hidden="true">&rarr;</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                
                            {/* Invoice */}
                            <div className="-mx-4 px-4 py-8 ring-1 shadow-xs ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pt-16 xl:pb-20">
                              <h2 className="text-base font-semibold text-gray-900">Invoice</h2>
                              <dl className="mt-6 grid grid-cols-1 text-sm/6 sm:grid-cols-2">
                                <div className="sm:pr-4">
                                  <dt className="inline text-gray-500">Issued on</dt>{' '}
                                  <dd className="inline text-gray-700">
                                    <time dateTime="2023-23-01">January 23, 2023</time>
                                  </dd>
                                </div>
                                <div className="mt-2 sm:mt-0 sm:pl-4">
                                  <dt className="inline text-gray-500">Due on</dt>{' '}
                                  <dd className="inline text-gray-700">
                                    <time dateTime="2023-31-01">January 31, 2023</time>
                                  </dd>
                                </div>
                                <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                                  <dt className="font-semibold text-gray-900">From</dt>
                                  <dd className="mt-2 text-gray-500">
                                    <span className="font-medium text-gray-900">Acme, Inc.</span>
                                    <br />
                                    7363 Cynthia Pass
                                    <br />
                                    Toronto, ON N3Y 4H8
                                  </dd>
                                </div>
                                <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pt-6 sm:pl-4">
                                  <dt className="font-semibold text-gray-900">To</dt>
                                  <dd className="mt-2 text-gray-500">
                                    <span className="font-medium text-gray-900">Tuple, Inc</span>
                                    <br />
                                    886 Walter Street
                                    <br />
                                    New York, NY 12345
                                  </dd>
                                </div>
                              </dl>
                              <table className="mt-16 w-full text-left text-sm/6 whitespace-nowrap">
                                <colgroup>
                                  <col className="w-full" />
                                  <col />
                                  <col />
                                  <col />
                                </colgroup>
                                <thead className="border-b border-gray-200 text-gray-900">
                                  <tr>
                                    <th scope="col" className="px-0 py-3 font-semibold">
                                      Projects
                                    </th>
                                    <th scope="col" className="hidden py-3 pr-0 pl-8 text-right font-semibold sm:table-cell">
                                      Hours
                                    </th>
                                    <th scope="col" className="hidden py-3 pr-0 pl-8 text-right font-semibold sm:table-cell">
                                      Rate
                                    </th>
                                    <th scope="col" className="py-3 pr-0 pl-8 text-right font-semibold">
                                      Price
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {invoice.items.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-100">
                                      <td className="max-w-0 px-0 py-5 align-top">
                                        <div className="truncate font-medium text-gray-900">{item.title}</div>
                                        <div className="truncate text-gray-500">{item.description}</div>
                                      </td>
                                      <td className="hidden py-5 pr-0 pl-8 text-right align-top text-gray-700 tabular-nums sm:table-cell">
                                        {item.hours}
                                      </td>
                                      <td className="hidden py-5 pr-0 pl-8 text-right align-top text-gray-700 tabular-nums sm:table-cell">
                                        {item.rate}
                                      </td>
                                      <td className="py-5 pr-0 pl-8 text-right align-top text-gray-700 tabular-nums">{item.price}</td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <th scope="row" className="px-0 pt-6 pb-0 font-normal text-gray-700 sm:hidden">
                                      Subtotal
                                    </th>
                                    <th
                                      scope="row"
                                      colSpan={3}
                                      className="hidden px-0 pt-6 pb-0 text-right font-normal text-gray-700 sm:table-cell"
                                    >
                                      Subtotal
                                    </th>
                                    <td className="pt-6 pr-0 pb-0 pl-8 text-right text-gray-900 tabular-nums">{invoice.subTotal}</td>
                                  </tr>
                                  <tr>
                                    <th scope="row" className="pt-4 font-normal text-gray-700 sm:hidden">
                                      Tax
                                    </th>
                                    <th
                                      scope="row"
                                      colSpan={3}
                                      className="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell"
                                    >
                                      Tax
                                    </th>
                                    <td className="pt-4 pr-0 pb-0 pl-8 text-right text-gray-900 tabular-nums">{invoice.tax}</td>
                                  </tr>
                                  <tr>
                                    <th scope="row" className="pt-4 font-semibold text-gray-900 sm:hidden">
                                      Total
                                    </th>
                                    <th
                                      scope="row"
                                      colSpan={3}
                                      className="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell"
                                    >
                                      Total
                                    </th>
                                    <td className="pt-4 pr-0 pb-0 pl-8 text-right font-semibold text-gray-900 tabular-nums">
                                      {invoice.total}
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                
                        
                          </div>
                        </div>
                      </main>
                    </>
                {/* end content */}
                    </div>
              </main>
            </div>
          </RequireAuth>
  )
}

export default page