import Link from "next/link"
function page() {
  return (
    <div className="flex min-h-full lg:flex">
        <div className="flex flex-1 flex-col justify-center px-8 py-12">
          <div className="mx-auto w-full justify-center max-w-md">
            <div>
              <img
                alt="NCHE IMIS "
                src="/images/logo.png"
                className="h-35 w-auto"
              />
              <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">Institutional Login</h2>
              <p className="mt-2 text-sm/6 text-gray-500">
                Not a member?{' '}
                <Link href="/auth/register" className="font-semibold text-sky-600 hover:text-sky-500">
                  Register here
                </Link>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                     
                     
                    </div>

                    <div className="text-sm/6">
                      <a href="#" className="font-semibold text-sky-600 hover:text-sky-500">
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-10">
               

               
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden flex-1 lg:block">
          <img
            alt=""
            src="/images/login_bg.png"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
  )
}

export default page