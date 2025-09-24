import Image from "next/image";
import Link from "next/link";
import RegistrationForm from "./RegistrationForm";
function page() {
  return (
    <div className="flex min-h-screen lg:flex">
        <div className="flex flex-1 flex-col justify-start px-8 py-3 h-screen  ">
          <div className="mx-auto w-full h-full flex flex-col justify-start">
  <div>
    <Image
      alt="NCHE IMIS"
      height={500}
      width={500}
      src="/images/logo.png"
      className="h-20 w-auto dark:bg-white"
    />
    <h2 className="mt-2 text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-gray-50">
      Institutional Registration
    </h2>
    <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-100">
      Already have an account?{' '}
      <Link href="/auth/login" className="font-semibold text-sky-600 hover:text-sky-500">
        Login
      </Link>
    </p>
  </div>
  <div className="mt-3 flex-1">
    <RegistrationForm  showStepNumber={true}/>
    
  </div>
</div>
        </div>
        <div className="relative hidden flex-1 lg:block h-screen">
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
  )
}

export default page