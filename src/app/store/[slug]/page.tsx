'use client'
import { useEffect, useState } from "react";
import { PiInfoLight } from "react-icons/pi";
import { IProduct } from "@/interface/store";
import Skeleton from "@/components/skeleton/skeleton";
import ProductCard from "@/components/cards/productCard";
import Link from "next/link";
import { Envelope, FacebookLogo, InstagramLogo, MapPin, User, WhatsappLogo, XLogo } from "@phosphor-icons/react";
import { fetchUserDataByStorename } from "@/actions/useProfile";
import { UserData } from "@/interface/profile";
import { getAllBusinessProducts } from "@/actions/useProducts";
import Avatar from "@/components/avatar/avatar";
import { useParams } from "next/navigation";

function StorePage()  {
    const [ products, setProducts ] = useState([] as IProduct[])
    const [ userData, setUserData ] = useState([] as UserData)
    const [loading, setLoading] = useState(false)
    const { slug } = useParams()
    const search: string = typeof slug !== "string" ? "" : slug

    useEffect(() => {
        if(search !== "") {
            setLoading(true)
            fetchUserDataByStorename(search.replaceAll("-", " "))
            .then((response) => {
                setLoading(false)
                if(response?.error) {
                    setLoading(false)                    
                }
                else {
                    setUserData(response)
                    console.log(response)
                    setLoading(false)
                }
            })
            .catch((error: { message: string }) => {
                setLoading(false)
            });
        }
    }, [search])

    useEffect(() => {
        if(search !== "") {
            setLoading(true)
            getAllBusinessProducts(search.replaceAll("-", " "))
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
        }
    }, [search])

    return (
        <main>
            
            <div className={`relative dark:text-white md:px-[9%] mb-8 md:flex gap-10`}>
                <div className="md:w-[30%] sticky top-[90px] left-0 h-full w-full bg-white dark:bg-black md:block hidden rounded text-[12px]">
                    
                    <div className="w-full p-4 border border-gray-500/[0.1] rounded-[10px]">
                        <p className="uppercase font-medium py-2 border border-transparent border-b-gray-500/[0.1]">Contact seller</p>
                        <div className="overflow-x-auto w-full mt-4">
                            <Link href={`tel:${userData?.socialLinks?.whatsapp}`} className="mb-4 p-2 rounded bg-slate-100 dark:bg-dark flex gap-2 items-center"><User /> {userData?.business_name}</Link>
                            <Link href={`mailto:${userData?.email}`} className="mb-4 p-2 rounded bg-slate-100 dark:bg-dark flex gap-2 items-center"><Envelope /> {userData?.email}</Link>
                            <Link href={`mailto:${userData?.email}`} className="mb-4 p-2 rounded bg-slate-100 dark:bg-dark flex gap-2 items-center"><MapPin /> {userData?.business_location}</Link>
                            <div className="flex gap-3">
                                <Link href={`https://api.whatsapp.com/${userData?.socialLinks?.whatsapp}`} className="p-2 border border-gray-500/[0.4] rounded-full"><WhatsappLogo size={18}/></Link>
                                <Link href={userData?.socialLinks?.facebook || "#"} className="p-2 border border-gray-500/[0.4] rounded-full"><FacebookLogo size={18}/></Link>
                                <Link href={userData?.socialLinks?.x || "#"} className="p-2 border border-gray-500/[0.4] rounded-full"><XLogo size={18}/></Link>
                                <Link href={userData?.socialLinks?.instagram || "#"} className="p-2 border border-gray-500/[0.4] rounded-full"><InstagramLogo size={18}/></Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:w-[70%] w-full">
                    <div className="flex flex-col items-center md:px-[8%] px-6 min-h-[200px] rounded bg-slate-100 dark:bg-dark bg-center bg-cover" style={{ backgroundImage: `url("${userData?.cover}")` }}>
                        
                    </div>
                    <div className="px-6 mb-8 -mt-6">
                        <Avatar user={ userData || { fullname: "user" }} />
                        <h2 className="font-bold text-[20px] mt-4">{search}</h2>
                        <p>{userData?.business_category}</p>
                    </div>

                    <section className=" md:px-0 px-4">

                            { loading ? 
                            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 md:gap-8 gap-4">
                                <Skeleton type="rectangle" />
                                <Skeleton type="rectangle" />
                                <Skeleton type="rectangle" />
                            </div> :
                            products?.length !== 0 ?
                            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 md:gap-8 gap-4">
                                {
                                    products?.map((product: IProduct) => (
                                        <div key={product._id}>
                                            <ProductCard  product={product} />
                                        </div>
                                    ))
                                }
                            </div>
                            : 
                                <div className="w-full h-[40vh] flex flex-col items-center justify-center gap-4 p-[3%]">
                                    <PiInfoLight className="text-primary text-[30px] p-1 rounded-full mr-4 border border-gray-500/[0.2]" /> 
                                    <p className="">No Product found</p>
                                </div>
                            }
                    </section>
                </div>
            </div>
           
           

        </main>
    )
}

export default StorePage;