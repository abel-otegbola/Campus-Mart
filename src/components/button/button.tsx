import Link from "next/link";
import { ReactNode, ButtonHTMLAttributes } from "react";

export interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "tetiary";
    className?: string;
    href?: string;
    size?: "small" | "medium" | "large";
    disabled?: boolean,
    onClick?: () => void,
    children?: ReactNode
}

export default function Button({ variant, className, href, size, disabled, onClick, children, ...props }: buttonProps) {
    const variants = {
        primary: "hover:bg-primary/[0.8] bg-primary text-white border border-primary",
        secondary: "hover:bg-primary/[0.2] border border-primary text-primary",
        tetiary: "bg-gray-500/[0.09] hover:bg-primary/[0.5] border border-gray-500/[0.09] "
    }

    return (
       <>
            { 
            href ? 
                <Link role="button" href={href} className={`rounded flex items-center justify-center md:gap-3 gap-2 w-fit ${variants[variant || "primary"]} 
                    ${disabled ? "opacity-[0.25]" : ""} 
                    ${size === "small" ? "text-[10px] py-[4px] px-[12px]" : size === "large" ? "py-[16px] px-[32px]" : "py-[12px] px-[24px]"} 
                    ${className} 
                     `}> 
                    { children }
                </Link>

                : <button className={`rounded duration-500 flex items-center justify-center md:gap-3 gap-2 w-fit
                    ${variants[variant || "primary"]} 
                    ${disabled ? "opacity-[0.25]" : ""} 
                    ${size === "small" ? "text-[10px] py-[4px] px-[12px]" : size === "large" ? "py-[16px] px-[32px]" : "py-[12px] px-[24px]"} 
                    ${className} 
                `}
                {...props}
                name="Button"
                role="button"
                disabled={disabled}
                onClick={onClick}
                >
                { children }
                </button>
        }
    </>
    )
}