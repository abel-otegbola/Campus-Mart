'use client'

import { storeContext } from "@/context/useStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkHTMLAttributes, ReactNode, useContext } from "react";

interface tabProps extends LinkHTMLAttributes<HTMLLinkElement> {
    id: string;
    href: string;
    label: string;
    icon?: ReactNode;
}

export default function Tab ({ href, label, icon, id, ...props }: tabProps) {
    const pathname = usePathname()
    const { cart } = useContext(storeContext)

    return (
        <Link
            href={href}
            className={`relative flex items-center justify-center md:flex-row flex-col md:gap-1 gap-2 h-[32px] p-[8px_16px] hover:text-primary font-bold rounded-lg duration-500
                ${pathname.includes(href) ? "text-primary" : "hover:bg-primary/[0.02]"}
                ${props.className}
                ${+id < 4 ? "md:flex hidden" : "md:hidden flex"}
            `}
        >
            <span className={`md:text-md md:text-[20px] ${pathname.includes(href) ? "text-[24px]": "text-[20px]"}`}>{icon}</span>
            <span className="md:inline md:text-[12px] text-[9px] ">{pathname.includes(href) ? 
                <>
                    <span className="md:hidden block w-1 h-1 rounded-full bg-primary"></span>
                    <span className="md:block hidden">{label}</span> 
                </>
                : label}
            </span>
            { label === "Cart" ? <span className="absolute text-[8px] -top-3 right-[20%] px-2 py-1 rounded-full bg-green text-white">{cart.length}</span> : "" }
        </Link>
    )
}