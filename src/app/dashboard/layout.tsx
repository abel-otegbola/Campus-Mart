'use client'
import { ReactElement, useContext, useEffect, useState } from "react";
import { TbBell, TbDashboard, TbHome2, TbHomeUp, TbListDetails, TbLogout, TbPackage, TbPackages, TbSettings, TbUser } from "react-icons/tb";
import { Icon } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Avatar from "@/components/avatar/avatar";
import { useSession } from "next-auth/react";
import { AuthContext } from "@/context/useAuth";
import { useOutsideClick } from "@/helpers/useClickOutside";


export interface Link {
    id: number; label: string; icon: ReactElement<Icon>, link: string, subLinks?: Link[]
}

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const { data } = useSession()
    const { getUserData, user, logOut } = useContext(AuthContext)
    const [open, setOpen] = useState(false)
    const pathname = usePathname();
    const [openedLink, setOpenedLink] = useState("My Store")

    useEffect(() => {
        getUserData(data?.user?.email || "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const generalLinks: Link[] = [
        { id: 0, label: "Dashboard", icon: <TbDashboard />, link: "/dashboard" },
        { id: 1, label: "Orders", icon: <TbListDetails />, link: "/dashboard/orders" },
        { id: 2, label: "Profile", icon: <TbUser />, link: "/dashboard/profile" },
        { id: 3, label: "Settings", icon: <TbSettings />, link: "/settings" },
    ]

    const storeLinks: Link[] = [
        { id: 0, label: "Dashboard", icon: <TbDashboard />, link: "/dashboard" },
        { id: 1, label: "My Store", icon: <TbHome2 />, link: "#", subLinks: [ 
            { id: 3, label: "Storefront", icon: <TbHomeUp />, link: "/dashboard/store" },
            { id: 4, label: "New Product", icon: <TbPackage />, link: "/dashboard/inventory/new" },
            { id: 5, label: "Products", icon: <TbPackages />, link: "/dashboard/inventory" },
            { id: 6, label: "Orders", icon: <TbListDetails />, link: "/dashboard/orders" },
            { id: 7, label: "Store settings", icon: <TbListDetails />, link: "/dashboard/store-settings" },
         ] 
        },
        { id: 8, label: "Account Settings", icon: <TbUser />, link: "/dashboard/profile" },
        { id: 9, label: "Notifications", icon: <TbBell />, link: "/dashboard/notifications" },
        { id: 10, label: "Settings", icon: <TbSettings />, link: "/settings" },
    ]

    const modalRef = useOutsideClick(setOpen, false)

    if(!data?.user) {
        return <></>
    }

    return (
        <>
            <div ref={modalRef} className="flex w-full min-h-[85vh] border-t border-gray-500/[0.1]">
                <button className="md:hidden fixed top-[16px] md:right-9 right-4 md:p-2 md:z-[0] z-[15]" onClick={() => setOpen(!open)}><Avatar user={ user || data?.user || { fullname: "user" }} /></button>
                <div className={`fixed md:top-[80px] top-0 left-0 h-screen sm:w-[260px] md:bg-transparent bg-black/[0.8] w-full z-[12] ${open ? "translate-x-[0]": "md:translate-x-[0] translate-x-[130%]"}`}>
                    <div className={`flex flex-col justify-between md:w-full w-[240px] md:h-[86vh] h-[100vh] md:sticky fixed md:top-0 top-0 py-4 md:px-8 right-0 bg-white dark:bg-black border border-transparent border-x-gray-500/[0.1] overflow-hidden transition-all duration-700 ${open ? "translate-x-[0]": "md:translate-x-[0] translate-x-[130%]"}`}>  
                        <div className="flex flex-col gap-1">
                            {
                            (data?.user?.role === "Seller" || user?.role === "Seller"  ? storeLinks : generalLinks).map(link => {
                                    return (
                                    <>
                                    <Link key={link.id} onClick={() => {setOpen(false); setOpenedLink(link.label)}} href={ link.link} className={`flex items-center justify-between my-[3px] px-4 py-1 md:rounded duration-500 ${pathname === link.link ? "bg-primary/[0.1] text-primary" : " hover:bg-primary/[0.1] hover:text-primary"}`}>
                                        <span className="w-[30px] text-lg opacity-[0.6]">{link.icon}</span>
                                        <span className="flex-1 py-2 break-normal">{link.label}</span>
                                    </Link>
                                    {
                                        link.subLinks ?
                                        <div className={`relative flex flex-col gap-2 ml-6 overflow-hidden duration-500 text-[12px] ${openedLink === link.label ? "h-[100%]" : "h-[0%]"}`}>
                                        <span className="absolute -top-4 left-0 w-[1px] h-full bg-gray-500/[0.4]"></span>
                                        {
                                        link.subLinks.map(subLink => {
                                                return (
                                                <Link key={subLink.id} onClick={() => setOpen(false)} href={ subLink.link} className={`flex items-center justify-between gap-2 md:rounded duration-500 ${pathname === subLink.link ? "bg-primary/[0.1] text-primary" : " hover:bg-primary/[0.1] hover:text-primary"}`}>
                                                    <span className="w-[16px] h-[1px] bg-gray-500/[0.4]"></span>
                                                    <span className="w-[20px] text-lg opacity-[0.6]">{subLink.icon}</span>
                                                    <span className="flex-1 py-2 break-normal">{subLink.label}</span>
                                                </Link>
                                                )
                                        })
                                        }
                                    </div>
                                        :
                                        ""
                                    }
                                    </>
                                    )
                            })
                            }
                        </div>
                        
                        <button onClick={() => logOut()} className={`w-full flex items-center my-[3px] px-4 py-1 hover:bg-primary/[0.1] hover:text-primary rounded`}>
                            <span className="w-[30px] text-lg opacity-[0.6]"><TbLogout /></span>
                            <span className="py-2 break-normal">Logout</span>
                        </button>
                    </div>
                </div>

                <div className="md:ml-[260px] p-4 mb-12 flex-1 md:bg-slate-100/[0.2] md:dark:bg-gray-500/[0.07]">
                {
                    children
                }
                </div>
            </div>
        </>
    )    
}
