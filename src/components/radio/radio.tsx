'use client'
import { CheckCircle, Spinner } from "@phosphor-icons/react";
import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";

interface RadioProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    active: string;
    disabled?: boolean;
    label?: string;
    name?: string;
    error?: string | undefined;
    size?: number | undefined;
    onCheck: (aug0: string | undefined) => void;
}

export default function Radio({ className, active, disabled, label, onCheck, name, size, ...props }: RadioProps) {
    const [checked, setChecked] = useState(false)
    const [animate, setAnimate] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChecked = () => {
        inputRef.current?.click()
        if(active !== label) {
            setAnimate(true)
            setTimeout(() => {
                onCheck(label)
                setChecked(true)
                setAnimate(false)
            }, 200)
        }
    }

    useEffect(() => {
        setChecked(active !== label ? false : true)
    }, [active, label])

    return (
        <div className="flex items-center w-fit gap-1">
            <input name={name} type="radio" 
                className="hidden" 
                id={props.id} />
            <label htmlFor={props.id} className="flex items-center gap-2">
            <span
                className={` rounded-full border flex justify-center items-center
                    ${disabled ? "opacity-[0.25]" : ""} 
                    ${checked ? "text-white border-none bg-primary" : "border-gray-500/[0.4]"} 
                    ${animate ? "animate-spin-slow" : ""}
                    ${className} 
                `}
                tabIndex={1}
                onClick={() => handleChecked()}
                style={{ height: size || "20px", width: size || "20px" }}
                {...props}
            >
                {animate ? <Spinner size={size || 20} className="animate-spin" /> : active === label ? <CheckCircle size={size || 20} /> : ""}
            </span>
            <span onClick={() => handleChecked()}>{label}</span>
            </label>
        </div>
    )
}