'use client'
import { BoxArrowUp, MagnifyingGlass, User } from "@phosphor-icons/react";
import { ReactNode, useState } from "react";
import Dropdown from "../dropdown/dropdown";

interface dropdownProps {
    className?: string;
    value?: string;
    onChange?: (aug0: string) => void;
    disabled?: boolean;
    label?: string;
    placeholder?: string;
    leftIcon?: ReactNode;
}

export default function Search({ value, onChange, className, disabled, placeholder }: dropdownProps) {
    const [focus, setFocus] = useState(false)

    return (
        <form action={`/search`} className={`relative flex flex-col w-full gap-1`}>

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
                    onChange={(e) => onChange ? onChange(e.target.value): ""}
                />
                <Dropdown className="w-[120px] border-secondary/[0.1]" placeholder="products" value={"products"} onChange={(value) => onChange && onChange(value)} options={[{ id: 0, title: "vendors", icon: <User /> }, { id: 1, title: "products", icon: <BoxArrowUp /> }]} />
                <button type="submit" className="opacity-[0.5] pl-2" onClick={(e) => e.preventDefault()}><MagnifyingGlass size={16} /></button>
            </div>
        </form>
    )
}