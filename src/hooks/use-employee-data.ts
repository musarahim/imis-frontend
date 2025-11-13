import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";

export default function useEmployeeData() {
  const { data: user, isLoading, isError } = useRetrieveUserQuery();

  return {
    user,
    isLoading,
    isError,
  };
}