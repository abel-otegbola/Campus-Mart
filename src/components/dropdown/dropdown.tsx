'use client'
import { ReactNode, useRef, useState } from "react";

type option = {
  id: string | number;
  icon?: ReactNode;
  title: string;
}

interface dropdownProps {
    className?: string;
    disabled?: boolean;
    label?: string;
    name?: string;
    value: string | number;
    onChange: (value: string) => void;
    error?: string | undefined;
    options?: option[];
    placeholder?: string
}

export default function Dropdown({ className, disabled, label, name, options, value, onChange, error }: dropdownProps) {
    const [focus, setFocus] = useState(false)

    return (
        <div className={`relative flex flex-col gap-1 ${className}`}>
            <div className="flex justify-between gap-4">
                { label ? <label htmlFor={name} className={`text-[12px] ${focus ? "text-primary" : ""}`}>{label}</label> : "" }
            </div>

            <div className={`flex items-center relative rounded-lg bg-transparent w-full py-1 pl-1 border duration-500 z-[1] 
                ${error && !focus ?  "border-red-500 text-red-500 " : "border-gray/[0.3] dark:border-gray-500/[0.4]"}
                ${focus ? "border-primary dark:border-primary shadow-input-active" : ""}
                ${ className }
            `}>
                <span className="text-[16px]">
                  {/* <Map /> */}
                </span>
                <select
                    className={` p-2 w-[97%] outline-none bg-transparent cursor-pointer
                        ${className} 
                        ${disabled ? "opacity-[0.25]" : ""}
                    `}
                    name={name}
                    value={value}
                    id={name}
                    onClick={() => setFocus(!focus)}
                    onChange={(e) => {onChange(e.target.value)}}
                >
                  {
                    options?.map(option => (
                      <option className="flex gap-2 items-center dark:bg-dark" key={option.id} value={option.title}>{option.title}</option>
                    ))
                  }
                </select>

                { error && !focus ? <p className="absolute right-2 px-2 text-[12px] bg-white dark:bg-black text-red-500 backdrop-blur-sm">{error}</p> : "" }
            </div>
        </div>
    )
}