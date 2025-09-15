import Image from "next/image";


export default async function Page({
  params,
}: {
  params: Promise<{ uid: string; token: string }>;
}) {
  const { uid, token } = await params;

  if (!uid || !token) {
    return <div className="text-red-500">Invalid or missing parameters.</div>;
  }

  return (
    <div className="flex min-h-full lg:flex">
      <div className="flex flex-1 flex-col justify-center px-8 py-12 ">
        <div className="mx-auto w-full justify-center max-w-md">
          <div>
            <Image
              alt="NCHE IMIS"
              height={500}
              width={500}
              src="/images/logo.png"
              className="h-35 w-auto dark:bg-white"
            />
            <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Reset Password link sent to your email
            </h2>
            <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-100">
              Please check your email to reset your password.
            </p>
          </div>

          
        </div>
      </div>

      <div className="relative hidden flex-1 lg:block">
        <Image
          fill
          sizes="100vw"
          quality={100}
          priority
          loading="eager"
          draggable={false}
          decoding="async"
          fetchPriority="high"
          placeholder="blur"
          blurDataURL="/images/login_bg.png"
          alt=""
          src="/images/login_bg.png"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </div>
  );
}
