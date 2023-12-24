'use client'
import { storeContext } from "@/app/context/storeContext"
import { data } from "@/app/data/projects"
import Image from "next/image"
import { useContext } from "react"
import { PiStar, PiTrash } from "react-icons/pi"
import { TbCurrencyNaira } from "react-icons/tb"

export default function Cart() {
    const { cart, setCart } = useContext(storeContext)

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item !== id))
    }

    return (
        <>
        <div className="flex justify-center items-center h-[150px]">
            <h1 className="font-bold text-[25px]">Cart</h1>
        </div>
        <div className="flex flex-wrap md:px-[8%] px-[3%] py-[30px] items-stretch min-h-[100vh]">

            <div className="md:w-[65%] w-full">
                {
                    data.products.filter(item => cart.indexOf(item.id) !== -1 ).map(product => (
                        <div key={product?.id} className="relative flex p-2 my-2 border border-gray-200 dark:border-gray-900 rounded">
                            <div className="relative h-[150px] w-[150px]">
                                <Image src={product?.thumbnail} fill sizes="100%" className="rounded bg-fill" />
                            </div>
                            <div className="px-6">
                                <h2 className="py-2">{product?.title}</h2>

                                <div className="flex items-center gap-2">
                                    <PiStar className="text-red" />
                                    {product?.rating}/5 <span className="opacity-[0.6]">(20)</span>
                                </div>
                                
                                <div className="flex justify-between items-center gap-4 mt-4 -ml-1">
                                    <h1 className="flex items-center text-[20px] font-bold"><TbCurrencyNaira />{product?.price}</h1>
                                    
                                    <PiTrash className="absolute right-4 top-4 text-[20px] text-red cursor-pointer" onClick={() => removeFromCart(product?.id) } />
                                </div>
                            
                            </div>
                        </div>
                    ))
                }
            </div>
            
        </div>
        </>
    )
}