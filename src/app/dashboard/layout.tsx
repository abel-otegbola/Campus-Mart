'use client'
import { ReactElement, useContext, useEffect, useLayoutEffect, useState } from "react";
import { TbBell, TbDashboard, TbListDetails, TbLogout, TbPackage, TbSettings, TbStar, TbUser, TbUsers } from "react-icons/tb";
import { Icon } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Avatar from "@/components/avatar/avatar";
import { signOut, useSession } from "next-auth/react";
import { AuthContext } from "@/context/useAuth";
import { useOutsideClick } from "@/helpers/useClickOutside";


export interface Link {
    id: number; label: string; icon: ReactElement<Icon>, link: string
}

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const { data } = useSession()
    const { getUserData, user } = useContext(AuthContext)
    const [open, setOpen] = useState(false)
    const pathname = usePathname();
    const router = useRouter()

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
        { id: 1, label: "Business Profile", icon: <TbUser />, link: "/dashboard/profile" },
        { id: 2, label: "Inventory", icon: <TbPackage />, link: "/dashboard/inventory" },
        { id: 3, label: "Orders", icon: <TbListDetails />, link: "/dashboard/orders" },
        { id: 4, label: "Customers", icon: <TbUsers />, link: "/dashboard/customers" },
        { id: 5, label: "Notifications", icon: <TbBell />, link: "/dashboard/notifications" },
        { id: 6, label: "Settings", icon: <TbSettings />, link: "/dashboard/settings" },
    ]

    const modalRef = useOutsideClick(setOpen, false)

    if(!data?.user) {
        return <></>
    }

    return (
        <>
            <div className="flex w-full min-h-[85vh] border-t border-gray-500/[0.1] overflow-hidden">
                <div ref={modalRef} className="md:sticky bg-gray md:w-[260px] w-0">
                    <button className="md:hidden fixed top-[18px] md:right-9 right-4 md:p-2 z-[10]" onClick={() => setOpen(!open)}><Avatar user={ user || data?.user || { fullname: "user" }} /></button>
                    <div className={`flex flex-col justify-between md:w-full w-[240px] h-[100vh] md:sticky fixed md:top-0 top-0 py-4 md:px-8 right-0 bg-white dark:bg-black border border-transparent border-x-gray-500/[0.1] overflow-hidden z-[5] transition-all duration-700 ${open ? "translate-x-[0]": "md:translate-x-[0] translate-x-[130%]"}`}>  
                        <div className="flex flex-col gap-1">
                            {
                            (data?.user?.role === "Seller" || user?.role === "Seller"  ? storeLinks : generalLinks).map(link => {
                                    return (
                                    <Link key={link.id} href={ link.link} className={`flex items-center justify-between my-[3px] px-4 py-1 md:rounded ${pathname === link.link ? "bg-primary/[0.1] text-primary" : " hover:bg-primary/[0.1] hover:text-primary"}`}>
                                        <span className="w-[30px] text-lg opacity-[0.6]">{link.icon}</span>
                                        <span className="flex-1 py-2 break-normal">{link.label}</span>
                                    </Link>
                                    )
                            })
                            }
                        </div>
                        
                        <button onClick={() => signOut()} className={`w-full flex items-center my-[3px] px-4 py-1 hover:bg-primary/[0.1] hover:text-primary rounded`}>
                            <span className="w-[30px] text-lg opacity-[0.6]"><TbLogout /></span>
                            <span className="py-2 break-normal">Logout</span>
                        </button>
                    </div>
                </div>

                <div className="flex-1 md:p-8 md:py-8 p-6 mb-12 flex-1 bg-slate">
                {
                    children
                }
                </div>
            </div>
        </>
    )    
}
