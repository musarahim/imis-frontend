import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

interface Item{
    name: string;
    href: string;
    current: boolean;
}

interface breadcrumbProps {
    pages: Item[]
}

function Breadcrumb({ pages }: breadcrumbProps) {
  return (
    
     <nav className="flex py-3 sm:px-3 mb-6 mt-6" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-6">
            <li>
              <div>
                <Link href="/" className="text-gray-400 hover:text-gray-500">
                  <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <span className="sr-only">Home</span>
                </Link>
              </div>
            </li>
            {pages.map((page) => (
              <li key={page.name}>
                <div className="flex items-center">
                  <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  <Link
                    href={page.href}
                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                    aria-current={page.current ? 'page' : undefined}
                  >
                    {page.name}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </nav>
        
  )
}

export default Breadcrumb