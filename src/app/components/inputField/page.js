'use client'
import { useEffect, useState } from "react"

export default function InputField({ type, label, action,  }) {
    const [focused, setFocused] = useState(false)

    useEffect(() => {
        console.log(focused)
    }, [focused])

    return (
        <div className="relative py-4 w-full">
            <label className={`absolute bg-white p-[2px] px-2 text-[10px] transition-all ${focused ? "text-[#5938DD] -top-2 left-0" : 'left-2 top-[5px]'}`} htmlFor={label}>{label}</label>
            <input 
                className="w-full border border-gray-400 rounded p-[10px] bg-white focus:outline outline-[#5938DD]/[0.3] hover:border-[#5938DD] outline-offset-2" 
                id={label} 
                type={type} 
                name={label} 
                onChange={(e) => action(e.target.value)} 
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
        </div>
    )
}