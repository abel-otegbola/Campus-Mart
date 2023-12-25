'use client'
import Button from "@/app/components/button/page"
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
        
        <div className="flex flex-wrap md:px-[8%] px-[3%] py-[30px] items-stretch min-h-[100vh]">

            <div className="md:w-[65%] w-full md:border border-transparent border-r-gray-200 dark:border-r-gray-900 md:pr-4">
                <div className="flex justify-between items-center h-[80px] border border-transparent border-b-gray-200 dark:border-b-gray-900 ">
                    <h1 className="font-bold text-[18px] px-2">Shopping Cart</h1>
                    <p>{cart.length} Items</p>
                </div>
                {
                    data.products.filter(item => cart.indexOf(item.id) !== -1 ).map(product => (
                        <div key={product?.id} className="relative flex p-2 my-2 border border-gray-200 dark:border-gray-900 rounded">
                            <div className="relative h-[100px] w-[100px]">
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

            <div className="md:w-[35%] rounded w-full md:px-4 md:pt-0 pt-8">
                <div className="flex items-center h-[80px] border border-transparent border-b-gray-200 dark:border-b-gray-900 ">
                    <h1 className="font-bold text-[18px] px-2">Order Summary</h1>
                </div>

                <div className="flex items-center justify-between py-6 px-2">
                    <p>Subtotal</p>
                    <p className="flex items-center text-[20px]"><TbCurrencyNaira /> {data.products.filter(item => cart.indexOf(item.id) !== -1 ).reduce((a,v) => a = a + v.price, 0)}</p>
                </div>
                
                <div className="py-6 px-2">
                    <p className="pb-4">Shipping</p>
                    <select placeholder="Choose shipping method" className="w-full bg-white dark:bg-black p-3 rounded focus:outline outline-blue/[0.3] outline-offset-1 border border-gray-200 dark:border-gray-900">
                        <option>Standard Delivery - #100</option>
                        <option>PRO Delivery - #500</option>
                    </select>
                </div>

                <div className="py-6 px-2">
                    <p className="pb-4">Promo Code</p>
                    <input placeholder="Enter your code" className="w-full bg-white dark:bg-black p-3 rounded focus:outline outline-blue/[0.3] outline-offset-1 border border-gray-200 dark:border-gray-900"/>
                    <Button text={"Apply"} to={"#"} type={""} />
                </div>

                <div className="flex items-center justify-between py-6 px-2 border border-transparent border-t-gray-200 dark:border-t-gray-900 ">
                    <p className="text-[20px]">Total</p>
                    <p className="flex items-center text-[20px]">
                        <TbCurrencyNaira /> 
                        {
                        data.products.filter(item => cart.indexOf(item.id) !== -1 ).reduce((a,v) => a = a + v.price, 0) + 100
                        }
                    </p>
                </div>

                <Button text={"Proceed to Checkout"} to={"/checkout"} type={"long"} />
            </div>
            
        </div>
        </>
    )
}