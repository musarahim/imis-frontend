"use client"
import { useActivationMutation } from "@/redux/features/authApiSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
function useActivation(uid: string, token: string) {
    const [activation, { isLoading, isError, isSuccess }] = useActivationMutation();
    const router = useRouter();
    const [message, setMessage] = useState<string | null>(null);
        const activateAccount = async () => {
          try {
            await activation({ uid, token }).unwrap();
            setMessage("Account activated successfully");
            toast.success("Account activated successfully");
            setTimeout(() => {
              router.push("/auth/login");
            }, 2000); // Redirect after 2 seconds
          }  catch (error: unknown) {
            if (error instanceof Error) {
              setMessage("Failed to activate account");
              toast.error(`Failed to activate account: ${error.message}`);
              console.error("Activation error:", error.message);
            } else {
              setMessage("An unknown error occurred");
              toast.error("An unknown error occurred");
              console.error("Activation error:", error);
            }
          }
        };
    
    return {activateAccount, isLoading, isError, isSuccess, message };

}

export default useActivation;