"use client";
import { useActivation } from "@/hooks";
import { useEffect } from 'react';

interface Props {
  uid: string;
  token: string;
}

function Activation({ uid, token }: Props) {
  const { isLoading, isError, isSuccess, message,activateAccount } = useActivation(uid, token);
    useEffect(() => {
        activateAccount();
    }, [activateAccount]);

  return (
    <>
     <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10">
                  {isLoading ? "Activating your account..." : message || "Processing..."}
                </h2>
                {isError && (
                  <p className="mt-2 text-sm text-red-500">
                    There was an error activating your account. Please ensure the
                    link is correct or request a new activation email.
                  </p>
                )}
                {isSuccess && message && (
                  <p className="mt-2 text-sm text-green-500">{message}</p>
                )}
                {!isLoading && !message && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Please wait while we activate your account.
                  </p>
                )}
    </>
  )
}

export default Activation