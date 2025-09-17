import { AppMenu } from '@/components';
import { RequireAuth } from '@/utils';



export default function Home() {
  return (
     <RequireAuth>
         <AppMenu />
            {/* Main content */}
    
            <div className="flex flex-col lg:pl-72">
              <main className="py-10">
                <div className="px-4 sm:px-6 lg:px-8">{/* Your content */}
                  <p> Institution Dashboard</p>
                </div>
              </main>
            </div>
          </RequireAuth>
  );
}




