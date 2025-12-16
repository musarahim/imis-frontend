
import { useGetEmployeeDropdownQuery } from "@/redux/features/commonApiSlice";
import { useGetLeaveTypesQuery } from "@/redux/features/leave-api-slice";


export default function useDropdownData() {

  const {data: leave_types} = useGetLeaveTypesQuery();
  const {data: employees_dropdown} = useGetEmployeeDropdownQuery();



  return {
   leave_types,
    employees_dropdown
  };
}