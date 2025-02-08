'use client'
import { useEffect, useState } from "react";
import { PiInfoLight } from "react-icons/pi";
import { useRouter, useSearchParams } from "next/navigation";
import { IProduct } from "@/interface/store";
import Skeleton from "@/components/skeleton/skeleton";
import CategoriesCard from "@/components/cards/categoriesCard";
import { Minus, Plus } from "@phosphor-icons/react";
import ProductCard from "@/components/cards/productCard";
import { getAllProducts } from "@/actions/useProducts";

function Shop()  {
    const [products, setProducts] = useState([] as IProduct[])
    const [search, setSearch] = useState([] as IProduct[])
    const [loading, setLoading] = useState(true)
    const router = useRouter();
    // const [filters, setFilters] = useState<any>({ categories: [], price: "", rating: "", size: "" })
    const searchParams = useSearchParams()
    const query = searchParams.get("query") || ""
    const [active, setActive] = useState("Categories")

    useEffect(() => {
        getAllProducts()
        .then((response) => {
            setLoading(false)
            if(response?.error) {
                setLoading(false)                    
            }
            else {
                setProducts(response)
                console.log(response)
                setLoading(false)
            }
        })
        .catch((error: { message: string }) => {
            setLoading(false)
        });
    }, [])

    useEffect(() => {
        setSearch(products.filter(item => item && (item?.title.toUpperCase().indexOf(query.toUpperCase()) !== -1 || item?.description.toUpperCase().indexOf(query.toUpperCase()) !== -1 || item?.category.toUpperCase().indexOf(query.toUpperCase()) !== -1)))
    }, [products, query])

    const setSearchParams = (search: string) => {
        router.push(`/shop?query=${search}`)
    }

    return (
        <main>
            <div className="flex flex-col items-center md:px-[8%] px-6 py-12 bg-slate-100 dark:bg-dark">
                <h2 className="font-bold text-[28px] uppercase">Shop</h2>
                <p>Find products and services</p>
            </div>
            <div className={`relative dark:text-white md:px-[8%] mt-8 mb-8 md:flex gap-10`}>
                <div className="flex flex-col gap-6 md:w-[30%] sticky top-[90px] left-0 h-full w-full md:block hidden rounded text-[12px]">
                    <div onClick={() => setActive("Categories")}  className="w-full p-4 border border-gray-500/[0.1] bg-gray-300/[0.08] dark:bg-dark rounded-[10px]">
                        <button className="uppercase font-medium flex justify-between items-center w-full">Categories { active === "Categories" ? <Minus /> : <Plus />}</button>
                        <div className={`overflow-y-auto w-full duration-500  ${ active === "Categories" ? "h-[350px]" : "h-0"} border-y border-gray-500/[0.1] mt-4`}>
                            <CategoriesCard />
                        </div>
                    </div>
                    <div onClick={() => setActive("Filter")} className="w-full p-4 border border-gray-500/[0.1] bg-gray-300/[0.08] dark:bg-dark rounded-[10px] mt-2 ">
                        <button  className="uppercase font-medium flex justify-between items-center w-full">Filter { active === "Filter" ? <Minus /> : <Plus />}</button>
                        <div className={`overflow-y-auto w-full duration-500  ${ active === "Filter" ? "h-[350px]" : "h-0"} border-y border-gray-500/[0.1] mt-4`}>
                            
                        </div>
                    </div>
                </div>

                <div className="md:w-[70%] w-full">

                    <section className=" md:px-0 px-4">

                            <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                                {   
                                    loading ?
                                        [0, 1, 2, 3, 4].map(index => (
                                            <div key={index} className="flex flex-col gap-2">
                                                <Skeleton type="rectangle"/>
                                                <Skeleton type="paragraph"/>
                                            </div>
                                        ))                                    
                                    :
                                    search?.length < 1 ?
                                    <div className="w-full h-[40vh] flex flex-col items-center justify-center gap-4 p-[3%]">
                                        <PiInfoLight className="text-primary text-[30px] p-1 rounded-full mr-4 border border-gray-500/[0.2]" onClick={() => setSearchParams("")} /> 
                                        <p className="">No Product found</p>
                                        <a className="px-6 py-[2px] border border-primary text-primary rounded" onClick={() => setSearchParams("")}>Refresh</a>
                                    </div>
                                    :
                                    search?.map((product: IProduct) => {
                                        return (
                                            <ProductCard key={product._id} product={product} />
                                        )
                                    })
                                }
                            </div>
                    </section>
                </div>
            </div>
           
           

        </main>
    )
}

export default Shop;