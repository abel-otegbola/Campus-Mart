'use client'
import { useOutsideClick } from "@/helpers/useClickOutside";
import { CaretDown, SortAscending } from "@phosphor-icons/react";
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
    placeholder?: string;
    options?: option[];
}

export default function Dropdown({ className, disabled, label, name, options, value, onChange, error, placeholder }: dropdownProps) {
    const [focus, setFocus] = useState(false)
    const [search, setSearch] = useState("")
    const [useSearch, setUseSearch] = useState(false)
    const [active, setActive] = useState<option>({ id: 0, title: "", icon: null })

    const optionsRef = useOutsideClick(setFocus, false)

    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (value: string) => {
      onChange(value)
    }

    return (
        <div ref={optionsRef} className={`relative flex flex-col gap-1 ${className}`}>
            { label ? <label htmlFor={name} className="text-[12px]">{label}</label> : "" }

            <div className={`flex items-center relative rounded-lg bg-transparent dark:bg-black w-full p-1 px-4 border duration-500 z-[1] 
                ${error && !focus ? "border-red text-red" : "border-black/[0.2]  dark:text-gray dark:border-gray-500/[0.2]"}
                ${focus ? "border-primary shadow-input-active" : " "}
                ${ className }
            `}>
                <span className="text-[16px]">{ active.icon || <SortAscending /> }</span>
                <input
                    ref={inputRef}
                    className={` p-2 w-[96%] outline-none bg-transparent cursor-pointer
                        ${className} 
                        ${disabled ? "opacity-[0.25]" : ""}
                    `}
                    name={name}
                    value={search}
                    placeholder={active.title || placeholder}
                    id={name}
                    onClick={() => setFocus(!focus)}
                    onChange={(e) => {setSearch(e.target.value); setUseSearch(true)}}
                    onBlur={(e) =>  setUseSearch(false)}
                />

                { error && !focus ? <p className="absolute right-2 px-2 text-[12px] bg-white dark:bg-dark backdrop-blur-sm">{error}</p> : "" }
                <span className={`${!focus ? "rotate-0" : "rotate-180" } duration-500 absolute right-2`}><CaretDown /></span>
            </div>

            <div className={`rounded-[8px] absolute top-[110%] left-0 w-full max-h-[200px] overflow-y-auto z-[1000] bg-white dark:bg-black dark:text-gray shadow-md duration-700 overflow-y-auto border border-gray-500/[0.2] ${focus ? "block" : "hidden"}`}>
              {
                (useSearch ? options?.filter(item => item.title.indexOf(search) !== -1) : options)?.map((option: option) => (
                  <div tabIndex={1} key={option.id} 
                    onClick={() => {setActive(option); handleChange(option.title); onChange(option.title); setFocus(false); setSearch(option.title); setUseSearch(false)}} 
                    className={`p-4 flex w-full items-center cursor-pointer gap-2 mb-[2px] hover:text-primary bg-white dark:bg-dark/[0.2] hover:dark:bg-dark/[0.5] ${option.title === value ? "text-primary" : ""}`}
                  >
                    <span className="">{option.icon}</span>
                    {option.title}
                  </div>
                ))
              }
            </div>
        </div>
    )
}