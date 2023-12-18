'use client'
import { PiBuildingsLight, PiShoppingBagLight, PiShoppingCartLight, PiStorefrontLight, PiUserCircleLight } from 'react-icons/pi'
import { usePathname } from "next/navigation"
import Search from '../search/page'
import { TbChevronRight, TbLogout, TbSettingsCog, TbUserCircle } from 'react-icons/tb'
import { useState } from 'react'

export default function Navbar() {
    const [open, setOpen] = useState(false)

    const active = open ? "block" : "hidden"

    const pathname = usePathname()
    const activeClass = "md:bg-blue/[0.07] text-blue"

    return (
        <div className="flex sticky top-0 left-0 bg-white dark:bg-black justify-between items-center p-2 md:px-[8%] px-[3%] border border-transparent border-y-gray-100 dark:border-y-gray-900 z-[1]">
            <a href='/' className="md:w-[20%] text-blue font-bold text-[18px]">Campus Mart</a>

            <nav className="flex md:static dark:bg-black bg-white fixed bottom-0 left-0 md:w-auto gap-2 w-full justify-between md:border-none border border-transparent border-y-gray-100 dark:border-y-gray-900 z-10">
                <a href="/" className={`flex md:flex-row flex-col items-center gap-2 p-[12px] px-6 md:hover:bg-blue/[0.07] hover:text-blue text-[20px] rounded-full ${pathname === "/" ? activeClass : ""}`}><PiBuildingsLight/> <span className="sm:text-[14px] text-[9px]">Home</span></a>
                <a href="/stores" className={`flex md:flex-row flex-col items-center gap-2 p-[12px] px-6 md:hover:bg-blue/[0.07] hover:text-blue text-[20px] rounded-full ${pathname === "/stores" ? activeClass : ""}`}><PiStorefrontLight /> <span className="sm:text-[14px] text-[9px]">Stores</span></a>
                <a href="/wishlist" className={`flex md:flex-row flex-col items-center gap-2 p-[12px] px-6 md:hover:bg-blue/[0.07] hover:text-blue text-[20px] rounded-full ${pathname === "/wishlist" ? activeClass : ""}`}><PiShoppingBagLight /> <span className="sm:text-[14px] text-[9px]">Wishlist</span></a>
                <p onClick={() => setOpen(!open)} className={`md:hidden flex md:flex-row flex-col items-center gap-2 p-[12px] px-6 md:hover:bg-blue/[0.07] hover:text-blue text-[20px] rounded-full ${pathname === "/dashboard" ? activeClass : ""}`}><PiUserCircleLight /> <span className="sm:text-[14px] text-[9px]">Dashboard</span></p>

                <div className={`absolute text-[12px] w-[250px] sm:top-[120%] sm:right-[8%] right-[3%] sm:bottom-auto bottom-[70px] rounded shadow border border-gray-100 dark:border-gray-800 bg-white dark:bg-black transition-all z-20 ${active}`}>
                    <a href="/dashboard" className='flex p-3 px-4 justify-between items-center'>
                        <div className="flex gap-2 items-center">
                            <TbUserCircle className="text-blue text-[20px]" />
                            <div>
                                <p className=''>Johnathan Fernando</p>
                                <p className='text-[10px]'>JohnathanF@gmail.com</p>
                            </div>
                        </div>
                        <TbChevronRight />
                    </a>
                    <a href="/settings" className='flex p-3 px-4 justify-between items-center'>
                        <div className="flex gap-2 items-center">
                            <TbSettingsCog className="text-blue text-[20px]" />
                            <p className='hover:text-blue'>Settings</p>
                        </div>
                        <TbChevronRight />
                    </a>
                    <a href="#" className='flex p-3 px-4 justify-between items-center'>
                        <div className="flex gap-2 items-center">
                            <TbLogout className="text-blue text-[20px]" />
                            <p className='hover:text-blue'>Logout</p>
                        </div>
                        <TbChevronRight />
                    </a>
                </div>
            </nav>

            <div className="flex justify-end md:w-[20%]">
                <Search />
                <a href="/cart" className="relative hover:bg-blue/[0.07] hover:text-blue text-[20px] rounded-full p-2 text-gray-700 dark:text-gray-200 md:mr-5 ml-2">
                    <PiShoppingCartLight/> 
                    <span className='flex items-center justify-center absolute top-0 right-0 rounded-full p-1 py-[0px] text-[10px] border-2 border-white dark:border-black bg-blue text-white'>0</span>
                </a>
                <p onClick={() => setOpen(!open)} className="md:block hidden bg-blue/[0.07] hover:text-blue text-[20px] rounded-full p-2 text-gray-700 dark:text-gray-200 cursor-pointer"><PiUserCircleLight/></p>
            </div>

        </div>
    )
}