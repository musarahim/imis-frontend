
"use client";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle
} from "@/components/ui/item";
import { useRetrieveLeaveApplicationQuery } from '@/redux/features/leave-api-slice';
import { Calendar1Icon, User2Icon } from "lucide-react";
function Content( {id}: {id: string}) {
    const {data, isLoading, isError} = useRetrieveLeaveApplicationQuery(Number(id), { refetchOnMountOrArgChange: true, });
    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error...</div>
    
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Item variant="outline" asChild>
        <div rel="noopener noreferrer">
             <ItemActions>
            <User2Icon className="size-4" />
          </ItemActions>
          <ItemContent>
            <ItemTitle>Leave Applicant</ItemTitle>
            <ItemDescription>
              {data?.employee}
            </ItemDescription>
          </ItemContent>
         
        </div>
        
      </Item>
      <Item variant="outline" asChild>
        <div rel="noopener noreferrer">
           
          <ItemContent>
            <ItemTitle>Leave Type</ItemTitle>
            <ItemDescription>
              {data?.leave_type}
            </ItemDescription>
          </ItemContent>
         
        </div>
        
      </Item>
          <Item variant="outline" asChild>
        <div rel="noopener noreferrer">
             <ItemActions>
            <Calendar1Icon className="size-4" />
          </ItemActions>
          <ItemContent>
            <ItemTitle>Leave Start Date</ItemTitle>
            <ItemDescription>
              {data?.start_date}
            </ItemDescription>
          </ItemContent>
         
        </div>
        
      </Item>
       <Item variant="outline" asChild>
        <div rel="noopener noreferrer">
             <ItemActions>
            <Calendar1Icon className="size-4" />
          </ItemActions>
          <ItemContent>
            <ItemTitle>Leave End Date</ItemTitle>
            <ItemDescription>
              {data?.end_date}
            </ItemDescription>
          </ItemContent>
         
        </div>
        
      </Item>
      <Item variant="outline" asChild>
        <div rel="noopener noreferrer">
             <ItemActions>
            <Calendar1Icon className="size-4" />
          </ItemActions>
          <ItemContent>
            <ItemTitle>Expected Return Date</ItemTitle>
            <ItemDescription>
              {data?.return_date}
            </ItemDescription>
          </ItemContent>
         
        </div>
        
      </Item>
         <Item variant="outline" asChild>
        <div rel="noopener noreferrer">
             <ItemActions>
            <User2Icon className="size-4" />
          </ItemActions>
          <ItemContent>
            <ItemTitle>Delegated Person</ItemTitle>
            <ItemDescription>
              {data?.delegated_to}
            </ItemDescription>
          </ItemContent>
         
        </div>
        
      </Item>
    </div>
  )
}

export default Content