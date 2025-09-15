import { AppMenu } from '@/components';
import { RequireAuth } from '@/utils';
function page() {
  return (
  <RequireAuth>
         <AppMenu />
            {/* Main content */}
    
            <div className="flex flex-col">
              <main className="py-10">
                <div className="px-4 sm:px-6 lg:px-8">
 <h1 className="text-4xl font-bold mb-4">My institution profile page</h1>
                    </div>
              </main>
            </div>
          </RequireAuth>
  )
}

export default page