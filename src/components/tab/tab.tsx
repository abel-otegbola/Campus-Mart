'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkHTMLAttributes, ReactNode } from "react";

interface tabProps extends LinkHTMLAttributes<HTMLLinkElement> {
    href: string;
    label: string;
    icon?: ReactNode;
}

export default function Tab ({ href, label, icon, ...props }: tabProps) {
    const pathname = usePathname()

    return (
        <Link
            href={href}
            className={`flex items-center justify-center md:flex-row flex-col md:gap-1 gap-2 h-[32px] p-[8px_16px] hover:text-primary font-light rounded-lg duration-500
                ${pathname === href ? "text-primary" : "hover:bg-primary/[0.02]"}
                ${props.className}
            `}
        >
            <span className="md:inline md:text-[14px] text-[12px] font-medium">{pathname === href ? 
                <>
                    <span className="md:hidden block w-1 h-1 rounded-full bg-primary"></span>
                    <span className="md:block hidden">{label}</span> 
                </>
                : label}
            </span>
        </Link>
    )
}