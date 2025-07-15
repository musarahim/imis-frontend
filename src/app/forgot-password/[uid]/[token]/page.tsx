import Image from "next/image";
import ResetPasswordConfirm from "./ResetPasswordConfirm";

interface Props{
    params: {
        uid: string;
        token: string;
    }
}

function page({params:{uid, token}}: Props) {
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
              <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-gray-50">Confirm Password Reset</h2>
             
            </div>

            <div className="mt-10">
              <div>
               <ResetPasswordConfirm uid={uid} token={token} />
              </div>

              <div className="mt-10">
               

               
              </div>
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
  )
}

export default page