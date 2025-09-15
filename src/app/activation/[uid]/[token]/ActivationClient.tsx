"use client";

import { useActivationMutation } from "@/redux/features/authApiSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ActivationClient({ uid, token }: { uid: string; token: string }) {
  const [activation] = useActivationMutation();
  const router = useRouter();

  useEffect(() => {
    if (!uid || !token) return;

    activation({ uid, token })
      .unwrap()
      .then(() => toast.success("Account activated successfully"))
      .catch(() => toast.error("Account activation failed"))
      .finally(() => router.push("/auth/login"));
  }, [uid, token, activation, router]);

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
          </div>

          <div className="mt-10">
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Please wait while we activate your account.
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
