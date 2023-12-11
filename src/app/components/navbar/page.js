'use client'
import { PiBuildingsLight, PiShoppingBagLight, PiShoppingCartLight, PiStorefrontLight, PiUserCircleLight } from 'react-icons/pi'
import { usePathname } from "next/navigation"
import Search from '../search/page'

export default function Navbar() {

    const pathname = usePathname()
    const activeClass = "md:bg-blue/[0.07] text-blue"

    return (
        <div className="flex sticky top-0 left-0 bg-white dark:bg-black justify-between items-center p-2 md:px-[8%] px-[3%] border border-transparent border-y-gray-100 dark:border-y-gray-900 z-[1]">
            <a href='/' className="md:w-[20%] text-blue font-bold text-[18px]">Campus Mart</a>

            <nav className="flex md:static dark:bg-black bg-white fixed bottom-0 left-0 md:w-auto gap-2 w-full justify-between md:border-none border border-transparent border-y-gray-100 dark:border-y-gray-900 z-[2]">
                <a href="/" className={`flex md:flex-row flex-col items-center gap-2 p-[12px] px-6 md:hover:bg-blue/[0.07] hover:text-blue text-[20px] rounded-full ${pathname === "/" ? activeClass : ""}`}><PiBuildingsLight/> <span className="sm:text-[14px] text-[9px]">Home</span></a>
                <a href="/stores" className={`flex md:flex-row flex-col items-center gap-2 p-[12px] px-6 md:hover:bg-blue/[0.07] hover:text-blue text-[20px] rounded-full ${pathname === "/stores" ? activeClass : ""}`}><PiStorefrontLight /> <span className="sm:text-[14px] text-[9px]">Stores</span></a>
                <a href="/wishlist" className={`flex md:flex-row flex-col items-center gap-2 p-[12px] px-6 md:hover:bg-blue/[0.07] hover:text-blue text-[20px] rounded-full ${pathname === "/wishlist" ? activeClass : ""}`}><PiShoppingBagLight /> <span className="sm:text-[14px] text-[9px]">Wishlist</span></a>
                <a href="/dashboard" className={`md:hidden flex md:flex-row flex-col items-center gap-2 p-[12px] px-6 md:hover:bg-blue/[0.07] hover:text-blue text-[20px] rounded-full ${pathname === "/dashboard" ? activeClass : ""}`}><PiUserCircleLight /> <span className="sm:text-[14px] text-[9px]">Dashboard</span></a>
            </nav>

            <div className="flex justify-end md:w-[20%]">
                <Search />
                <a href="/cart" className="hover:bg-blue/[0.07] hover:text-blue text-[20px] rounded-full p-2 text-gray-700 dark:text-gray-200 md:mr-5 ml-2"><PiShoppingCartLight/></a>
                <p href="/dashboard" className="md:block hidden bg-blue/[0.07] hover:text-blue text-[20px] rounded-full p-2 text-gray-700 dark:text-gray-200 cursor-pointer"><PiUserCircleLight/></p>
            </div>
        </div>
    )
}