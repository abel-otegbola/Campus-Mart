'use client'
import { fetchUserDataByStorename, searchAllStore } from "@/actions/useProfile";
import VendorCard from "@/components/cards/vendorCard";
import Skeleton from "@/components/skeleton/skeleton";
import { UserData } from "@/interface/profile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VendorsPage() {
    const searchParams = useSearchParams()
    const query = searchParams.get("search")?.toUpperCase() || ""
    const [loading, setLoading] = useState(true)
    const [vendors, setVendors] = useState([] as UserData[])
    const [search, setSearch] = useState([] as UserData[])

    useEffect(() => {
        if(query !== "") {
            setLoading(true)
            searchAllStore()
            .then((response) => {
                setLoading(false)
                if(response?.error) {
                    setLoading(false)                    
                }
                else {
                    setVendors(response)
                    setLoading(false)
                }
            })
            .catch((error: { message: string }) => {
                setLoading(false)
            });
        }
    }, [query])

    useEffect(() => {
        setSearch(vendors.filter(item => item?.business_name && item.business_name.toUpperCase().indexOf(query.toUpperCase()) !== -1))
    }, [vendors, query])

    return (
        <div className="min-h-[80vh]">
            <div className="flex flex-col items-center justify-center md:px-[8%] px-6 py-12 bg-slate-100 dark:bg-dark">
                <h2 className="font-bold text-[28px] uppercase">Vendors</h2>
                <p className="">Search results for: ({query})</p>
            </div>

            <div className="lg:px-[8%] px-6 py-[40px] w-full grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 py-2 my-4">
                {   
                    loading ?
                    <div className="flex flex-col gap-2">
                        <Skeleton type="rectangle"/>
                        <Skeleton type="paragraph"/>
                    </div>
                    :
                    search?.length < 1 ?
                    <div className="flex justify-center">No vendor found</div>
                    :
                    search?.map((vendor: UserData) => {
                        return (
                            <VendorCard key={vendor.id} vendor={vendor} />
                        )
                    })
                }
            </div>
        </div>
    )
}