import { AppMenu, Breadcrumb, Footer } from '@/components';
import { RequireAuth } from '@/utils';
function page() {
  return (
   <RequireAuth>
            <AppMenu />
               {/* Main content */}
              <Breadcrumb pages={[{ name: 'Interim authority', href: '/interim-authority', current: true }]} />
               <div className="flex flex-col lg:pl-72  ">
                 <main className="py-10 min-h-[calc(100vh-25rem)]">
                   <div className="px-4 sm:px-6 lg:px-8">{/* Your content */}
                     <p> Interim authority</p>
                   </div>
                 </main>
                  <Footer />
               </div>
              
             </RequireAuth>
  )
}

export default page