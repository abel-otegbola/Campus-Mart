'use client'
import { ReactElement, useContext, useEffect, useState } from "react"
import Tab from "../tab/tab"
import Link from "next/link"
import { Bell, Heart, House, ListMagnifyingGlass, ShoppingCart, User } from "@phosphor-icons/react"
import { usePathname } from "next/navigation"
import Search from "../search/search"
import { storeContext } from "@/context/useStore"
import { useSession } from "next-auth/react"
import { useOutsideClick } from "@/helpers/useClickOutside"

type navTab =  {
    id: number | string,
    label: string,
    to: string,
    icon: ReactElement
}

function Topbar() {
    const { cart } = useContext(storeContext)
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const { data } = useSession()

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
    })

    const noheader = ["login", "register"]

    const navTabs: navTab[] = [
        { id: 0, label: "Categories", to: "/categories", icon: <></> },
        { id: 1, label: "New Arrivals", to: "/shop", icon: <></> },
        { id: 2, label: "Deals", to: "/deals", icon: <></> },
        { id: 3, label: "Delivery", to: "/delivery", icon: <></> },
        { id: 4, label: "Home", to: "/", icon: <House /> },
        { id: 5, label: "Categories", to: "/categories", icon: <ListMagnifyingGlass /> },
        { id: 6, label: "Wishlist", to: "/wishlist", icon: <Heart /> },
        { id: 7, label: "Account", to: data?.user ? "/dashboard" : "/login", icon: <User /> },
    ]
    
    const accountPages = ["dashboard", "admin", "agent"]

    const closeMenu = useOutsideClick(setOpen, false)


    return (
        <div className={`flex py-3 sticky top-0 left-0 w-full justify-between items-center bg-[#f8f8f8] dark:bg-black z-[3]  ${noheader.includes(pathname.split("/")[1]) ? "hidden": ""} ${accountPages.includes(pathname.split("/")[1]) ? "md:px-10 pl-6 pr-[100px] md:py-2 py-5" : "md:px-[10%] px-6"}`}>
            <div className="md:w-[12%]">
                <Link href="/" className="w-[70px] h-[30px] text-[#FF9100] ml-6 rounded flex justify-center items-center md:text-[16px] text-[14px] font-bold">
                    CAMPUS <span className="text-[#16AF89]"> MART</span>
                </Link>
            </div>

            <nav className="flex justify-between md:static p-4 bg-[#f8f8f8] dark:bg-black/[0.9] backdrop-blur-sm fixed bottom-0 left-0 md:w-fit w-full md:border-none border border-gray-500/[0.1] items-center gap-0 z-[10]">
                {
                    navTabs.map((tab: navTab) => (
                        <Tab key={tab.id} label={tab.label} href={tab.to} icon={tab.icon} id={tab.id.toString()}/>
                    ))
                }
            </nav>

            <div className="flex gap-8 items-center md:flex-1 md:w-auto w-[70%]">
                <Search placeholder="Search for a product or vendor" className="md:flex-1 " />
                <Link href={data?.user ? "/dashboard": "/login"} className="md:flex hidden gap-1 items-center font-semibold">
                    <User weight="light" size={20}/>
                    <span>Account</span>
                </Link>
                <Link href="/cart" className="relative flex gap-1 items-center font-semibold">
                    <ShoppingCart weight="light" size={20}/>
                    <span>Cart</span>
                    <span className="absolute text-[8px] -top-3 -right-3 px-2 py-1 rounded-full bg-green text-white">{cart.length}</span>
                </Link>
            </div>
        </div>
    )
}

export default Topbar;