import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { useGetEmployeeByIdQuery } from "@/redux/features/hr-api-slice";

export default function useEmployeeData() {
  const { data: user, isLoading, isError } = useRetrieveUserQuery();
  const employee_id = user?.employee;
  const {data: employee} = useGetEmployeeByIdQuery(employee_id!, { skip: !employee_id });



  return {
    user,
    employee,
    isLoading,
    isError,
  };
}