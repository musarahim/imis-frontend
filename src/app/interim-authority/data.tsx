"use client"
import { DataTable } from "@/components/common/data-table";
import { useGetIntrimAuthoritiesQuery } from '@/redux/features/license-api-slice';
import { columns } from "./column";
function IntrimAuthorityData() {
    const {data,isLoading,isError}=useGetIntrimAuthoritiesQuery()
    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error...</div>
    console.log(data)
  return (
    <>
     <DataTable columns={columns} data={data ?? []} addHref="/interim-authority/new" addText="Apply for Interim Authority" />
    </>
  )
}

export default IntrimAuthorityData