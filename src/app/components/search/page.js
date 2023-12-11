'use client'
import { useEffect, useRef, useState } from "react";
import { PiMagnifyingGlassLight } from "react-icons/pi";

export default function Search() {
    const [open, setOpen] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        if(open) {
            inputRef.current.focus()
        }
    }, [open])

    return (
        <form className={`flex items-center px-2 rounded-full border-gray-400 dark:border-gray-600 outline-blue/[0.3] outline-offset-1 ${open ? "border outline": ""}`}>
            <PiMagnifyingGlassLight className="text-[20px]" onClick={() => setOpen(true)} />
            <input 
                ref={inputRef} 
                type="search" 
                className={`border-none bg-transparent p-1 px-2 text-[12px] outline-none overflow-hidden transition-all duration-[700] ${open ? "w-[150px]" : "w-[0]"}`} 
                placeholder="Search products, services..." 
                onBlur={() => setOpen(false)} 
            />
        </form>
    )
}