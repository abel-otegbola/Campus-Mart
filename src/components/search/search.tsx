'use client'
import { useOutsideClick } from "@/helpers/useClickOutside";
import { BoxArrowUp, MagnifyingGlass, User } from "@phosphor-icons/react";
import { ReactNode, useState } from "react";

interface dropdownProps {
    className?: string;
    value?: string;
    searchType?: string;
    onChange?: (aug0: string) => void;
    disabled?: boolean;
    label?: string;
    placeholder?: string;
    leftIcon?: ReactNode;
}

export default function Search({ value, onChange, searchType, className, disabled, placeholder }: dropdownProps) {
    const [focus, setFocus] = useState(false)
    const [open, setOpen] = useState(false)

    const searchRef = useOutsideClick(setOpen, false)

    return (
        <form action={searchType !== "Vendors" ? `/search` : '/vendors'} className={`relative flex flex-col w-full gap-1`}>

          <div className={`flex items-center gap-1 relative rounded-full bg-transparent dark:bg-dark dark:text-gray w-full px-4 border duration-500 
                ${focus ? "border-primary shadow-input-active" : "border-black/[0.06] "}
                ${className}
            `}>
                <input 
                    className={`py-3 p-2 w-full outline-none bg-transparent flex-1 text-[12px]
                        ${className} 
                        ${disabled ? "opacity-[0.25]" : ""}
                    `}
                    value={value}
                    name="search"
                    type="search"
                    placeholder={placeholder}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                />
                <button className="flex items-center" onClick={(e) => {e.preventDefault(); setOpen(!open)}}> 
                    <span className="opacity-[0.7] mr-1">|</span> 
                    <span className="opacity-[0.7] text-[10px] bg-white dark:bg-black border border-gray-500/[0.1] rounded h-full p-[10px]">{searchType || "Search by:"}</span>
                </button>
                <div ref={searchRef} className={`flex-col absolute bg-white dark:bg-black rounded-lg shadow-md p-2 top-[100%] right-0 w-[200px] overflow-hidden duration-500 ${open ? "flex" : "hidden"}`}>
                    <p className="text-[12px] py-2 border-b border-gray-500/[0.2]">Filter search:</p>
                    
                    {
                        [{ id: 0, title: "Vendors", icon: <User /> }, { id: 1, title: "Products", icon: <BoxArrowUp /> }].map(option => (
                            <button 
                                onClick={(e) => {onChange && onChange(option.title); e.preventDefault(); setOpen(false)}} 
                                key={option.id} 
                                className={`p-3 flex items-center hover:bg-gray-500/[0.09] gap-2 ${searchType === option.title ? "bg-primary/[0.09] text-primary" : ""}`}
                            >
                                {option.icon}
                                {option.title}
                            </button>
                        ))
                    }
                    
                </div>
                <button type="submit" className="opacity-[0.5] pl-2"><MagnifyingGlass size={16} /></button>
            </div>
        </form>
    )
}