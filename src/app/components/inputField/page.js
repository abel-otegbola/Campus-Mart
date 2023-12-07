'use client'
import { useEffect, useState } from "react"

export default function InputField({ type, label, action,  }) {
    const [focused, setFocused] = useState(false)

    useEffect(() => {
        console.log(focused)
    }, [focused])

    return (
        <div className="relative py-4 w-full">
            <label className={`absolute dark:bg-black bg-white p-[2px] px-2 transition-all ${focused ? "text-blue -top-2 left-0 text-[11px]" : 'left-2 top-[5px] text-[10px]'}`} htmlFor={label}>{label}</label>
            <input 
                className="w-full bg-white dark:bg-black border border-gray-400 dark:border-gray-600 rounded p-[10px] bg-white focus:outline outline-blue/[0.3] hover:border-blue outline-offset-1" 
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