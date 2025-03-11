'use client'
import { getAllProducts } from "@/actions/useProducts";
import ProductCard from "@/components/cards/productCard";
import Skeleton from "@/components/skeleton/skeleton";
import { IProduct } from "@/interface/store";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function SearchPage() {
    const searchParams = useSearchParams()
    const query = searchParams.get("search")?.toUpperCase() || ""
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([] as IProduct[])
    const [search, setSearch] = useState([] as IProduct[])

    useEffect(() => {
        if(query !== "") {
            setLoading(true)
            getAllProducts()
            .then((response) => {
                setLoading(false)
                if(response?.error) {
                    setLoading(false)                    
                }
                else {
                    setProducts(response)
                    setLoading(false)
                }
            })
            .catch((error: { message: string }) => {
                setLoading(false)
            });
        }
    }, [query])

    useEffect(() => {
        setSearch(products?.filter(item => item && (item?.title.toUpperCase().indexOf(query.toUpperCase()) !== -1 || item?.description.toUpperCase().indexOf(query.toUpperCase()) !== -1 || item?.category.toUpperCase().indexOf(query.toUpperCase()) !== -1)))
    }, [products, query])

    return (
        <div className="min-h-[80vh]">
            <div className="flex flex-col items-center justify-center md:px-[8%] px-6 py-12 bg-slate-100 dark:bg-dark">
                <h2 className="font-bold text-[28px] uppercase">Search</h2>
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
                    <div className="flex justify-center">No product found</div>
                    :
                    search?.map((product: IProduct) => {
                        return (
                            <ProductCard key={product._id} product={product} />
                        )
                    })
                }
            </div>
        </div>
    )
}