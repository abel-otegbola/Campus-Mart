'use client'
import { useOutsideClick } from "@/helpers/useClickOutside";
import { BoxArrowUp, MagnifyingGlass, User } from "@phosphor-icons/react";
import { ReactNode, useState } from "react";
import { TbHome } from "react-icons/tb";
import Dropdown from "../dropdown/dropdown";

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
    const [query, setQuery] = useState<string>("")
    const [school, setSchool] = useState<string>("All Schools")

    const searchRef = useOutsideClick(setOpen, false)

    return (
        <form action={`/search?${query !== "" ? "product=" + query : ""}&${school !== "All Schools" ? "school=" + school : ""}`} className={`relative flex flex-col w-full gap-1`}>

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
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div tabIndex={1} className="flex items-center" onClick={(e) => {e.preventDefault(); setOpen(!open)}}> 
                    <span className="opacity-[0.7] mr-1">|</span> 
                    <input name="school" value={school} onChange={(e) => setSchool(e.target.value)} className="w-[80px] opacity-[0.7] text-[10px] bg-white dark:bg-black border border-gray-500/[0.2] rounded h-[90%] px-[10px] py-2"/>
                </div>
                <div ref={searchRef} className={`text-[12px] flex-col absolute bg-white dark:bg-black rounded-lg shadow-md p-2 top-[100%] right-0 w-[240px] overflow-hidden duration-500 ${open ? "flex" : "hidden"}`}>
                    <div
                        className={`p-3 hover:bg-gray-500/[0.09] border border-gray-500/[0.1] rounded mb-[2px] gap-2`}
                    >
                        <div className="flex flex-col items-start">
                            Schools
                            <span className="text-[10px]">Select school to search products</span>
                        </div>
                        
                        <Dropdown value={school} onChange={(value) => setSchool(value)} options={[{id:0, title: "All Schools"}, { id:1, title: "OAU"}, { id:2, title: "UI"}, {id:3, title: "UNILAG"}, {id:4, title: "OAUCDL"}]} />
                    </div>
                </div>
                <button type="submit" className="opacity-[0.5] pl-2"><MagnifyingGlass size={16} /></button>
            </div>
        </form>
    )
}