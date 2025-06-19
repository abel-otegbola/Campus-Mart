'use client'
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

    return (
        <form action={searchType !== "Vendors" ? `/search` : '/vendors'} className={`relative flex flex-col w-full gap-1`}>

          <div className={`flex items-center gap-1 relative rounded-full bg-transparent dark:bg-dark dark:text-gray w-full p-1 px-4 border duration-500 
                ${focus ? "border-primary shadow-input-active" : "border-black/[0.06] "}
                ${className}
            `}>
                <input 
                    className={` p-2 w-full outline-none bg-transparent flex-1
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
                <button className="" onClick={(e) => {e.preventDefault(); setOpen(!open)}}> <span className="mr-2 opacity-[0.7]">|</span> <span className="opacity-[0.7] text-[10px]">{searchType || "Search by:"}</span></button>
                <div className={`flex-col absolute bg-white dark:bg-black rounded shadow-md py-1 top-[100%] right-0 w-[120px] overflow-hidden duration-500 ${open ? "flex" : "hidden"}`}>
                    
                    {
                        [{ id: 0, title: "Vendors", icon: <User /> }, { id: 1, title: "Products", icon: <BoxArrowUp /> }].map(option => (
                            <button onClick={(e) => {onChange && onChange(option.title); e.preventDefault(); setOpen(false)}} key={option.id} className="p-3 flex items-center hover:bg-gray-500/[0.09] gap-2">
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