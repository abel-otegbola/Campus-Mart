'use client'
import { CheckSquare, Spinner } from "@phosphor-icons/react";
import { ButtonHTMLAttributes, useState } from "react";

interface CheckboxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    disabled?: boolean;
    label?: string;
    name?: string;
    error?: string | undefined;
    size?: number | undefined;
    onCheck: (aug0: boolean) => void;
}

export default function Checkbox({ className, disabled, label, onCheck, name, size, ...props }: CheckboxProps) {
    const [focus, setFocus] = useState(false)
    const [checked, setChecked] = useState(false)
    const [animate, setAnimate] = useState(false)

    const handleChecked = () => {
        setAnimate(true)
        setTimeout(() => {
            onCheck(!checked)
            setChecked(!checked); setFocus(true)
            setAnimate(false)
        }, 300)
    }

    return (
        <div className="flex items-center w-fit gap-1">
            <button 
                className={` rounded border flex just0fy-center items-center
                    ${disabled ? "opacity-[0.25]" : ""} 
                    ${checked ? "text-white border-none bg-primary" : "border-gray-500/[0.4]"} 
                    ${focus ? "outline outline-primary/[0.2] outline-offset" : ""} 
                    ${animate ? "animate-ping" : ""}
                    ${className} 
                `}
                style={{ height: size || "20px", width: size || "20px" }}
                onClick={() => handleChecked()}
                onBlur={() => setFocus(false)}
                {...props}
            >
                {animate ? <Spinner size={size || 20} className="animate-spin" /> : checked ? <CheckSquare size={size || 20} /> : ""}
            </button>

            { label ? <label htmlFor={name} >{label}</label> : "" }
        </div>
    )
}