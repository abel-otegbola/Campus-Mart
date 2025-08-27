'use client'
import { ReactElement, useContext, useEffect, useState } from "react"
import Tab from "../tab/tab"
import Link from "next/link"
import { MagnifyingGlass, ShoppingCart, User, X } from "@phosphor-icons/react"
import { usePathname } from "next/navigation"
import Search from "../search/search"
import { storeContext } from "@/context/useStore"
import { useSession } from "next-auth/react"
import Categories from "../categories/categories"
import { TbHeart, TbHome, TbListSearch } from "react-icons/tb"
import ThemeSelector from "../themeSelector/themeSelector"

type navTab =  {
    id: number | string,
    label: string,
    to: string,
    icon: ReactElement
}

function Topbar() {
    const { cart } = useContext(storeContext)
    const pathname = usePathname()
    const { data } = useSession()
    const [open, setOpen] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)
    const [searchType, setSearchType] = useState("Products")
    const [cartLength, setCartLength] = useState(0)

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
    })

    const noheader = ["login", "register"]

    const navTabs: navTab[] = [
        { id: 1, label: "New Arrivals", to: "/shop", icon: <></> },
        { id: 2, label: "Deals", to: "/shop", icon: <></> },
        { id: 4, label: "Wishlist", to: "/wishlist", icon: <TbHeart /> },
        { id: 5, label: "Home", to: "/shop", icon: <TbHome /> },
        { id: 6, label: "Cart", to: "/cart", icon: <ShoppingCart /> },
        { id: 7, label: "Account", to: data?.user ? "/account" : "/login", icon: <User /> },
    ]
    
    const accountPages = ["account", "admin", "agent"]

    useEffect(() => {
        if(typeof window !== 'undefined') {
            setCartLength(cart?.length)
        }
    }, [cart])

    return (
        <>
        <div className={`relative flex md:py-1 py-3 sticky top-0 left-0 w-full justify-between items-center bg-[#f8f8f8] dark:bg-black border-b border-gray-500/[0.1] z-[10] ${noheader.includes(pathname.split("/")[1]) ? "hidden": ""} ${accountPages.includes(pathname.split("/")[1]) ? "md:px-10 pl-6 pr-[80px]" : "md:px-[8%] px-6"}`}>
            <div className="md:w-[12%] w-[150px]">
                <Link href="/" className="w-[70px] h-[30px] text-[#FF9100] md:ml-6 ml-3 rounded flex justify-center items-center md:text-[16px] text-[14px] font-bold">
                    CAMPUX <span className="text-[#16AF89]"> MART</span>
                </Link>
            </div>

            <nav className="md:flex grid md:grid-cols-4 grid-cols-5 md:static md:px-8 py-4 bg-[#f8f8f8] dark:bg-black/[0.9] backdrop-blur-sm fixed bottom-0 left-0 md:w-fit w-full md:border-none border border-gray-500/[0.1] items-center gap-0 z-[4]">
                <button className="flex items-center justify-center md:flex-row flex-col md:gap-1 gap-2 h-[32px] md:p-[8px_12px] hover:text-primary font-medium rounded-lg duration-500" onClick={() => setOpen(!open)}>
                    <span className={`md:hidden md:text-md md:text-[20px] ${open ? "text-[24px]": "text-[20px]"}`}><TbListSearch /></span>
                    <span className="md:inline md:text-[12px] text-[9px] ">{open ? 
                    <>
                        <span className="md:hidden block w-1 h-1 rounded-full bg-primary"></span>
                        <span className="md:block hidden">{"Categories"}</span> 
                    </>
                            : "Categories"}
                    </span>
                </button>
                {
                    navTabs.map((tab: navTab) => (
                        <Tab key={tab.id} label={tab.label} href={tab.to} icon={tab.icon} id={tab.id.toString()}/>
                    ))
                }
            </nav>

            <div className="flex md:gap-8 gap-3 items-center justify-end md:flex-1 lg:w-auto w-[70%]">
                <div className="lg:block hidden">
                    <Search placeholder="Search for a product or vendor" searchType={searchType} onChange={(value) => setSearchType(value)} className="lg:flex-1 lg:rounded-full rounded-[0px]" />
                </div>
                <button className="p-2 text-[16px] lg:hidden" onClick={() => setOpenSearch(!openSearch)}>{ openSearch ? <X /> :<MagnifyingGlass /> }</button>
                <Link href={data?.user ? "/account": "/login"} className="md:flex hidden gap-1 items-center font-medium text-[12px]">
                    <User weight="light" size={20}/>
                    <span>Account</span>
                </Link>
                <Link href="/cart" className="md:flex hidden relative gap-1 items-center font-medium text-[12px]">
                    <ShoppingCart weight="light" size={20}/>
                    <span>Cart</span>
                    <span className="absolute text-[8px] -top-3 -right-3 px-2 py-1 rounded-full bg-green text-white">{cartLength}</span>
                </Link>
                <ThemeSelector />
            </div>
            
            
            <div className={`lg:hidden flex items-center gap-2 absolute top-[100%] border border-gray-500/[0.2] shadow-lg left-0 w-full md:px-[7%] px-6 bg-[#f8f8f8] dark:bg-black z-[5] ${openSearch ? "h-[100px]": "h-[0px] overflow-hidden"}`}>
                {
                accountPages.includes(pathname.split("/")[1]) ? "" :
                <Search placeholder="Search for a product or vendor" searchType={searchType} onChange={(value) => setSearchType(value)} className="lg:flex-1 lg:rounded-full rounded-[0px]" />
                }
            </div> 
        </div>
        {
                open ? 
                <Categories open={open} setOpen={setOpen} />
                :
                ""
            }
        </>
    )
}

export default Topbar;