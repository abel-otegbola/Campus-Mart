'use client'
import Button from "@/components/button/button";
import { Spinner } from "@phosphor-icons/react";
import { HTMLAttributes, useState } from "react";
import InputOtp from "react-otp-input";

export interface IOTPInput extends HTMLAttributes<HTMLInputElement> {
  setValue: any;
  value: string;
  error: boolean;
}

export default function VerifyAccount ({ className, ...rest }: IOTPInput) {
    const [verifyOtp, setVerifyOtp] = useState("");

    const handleOtpChange = (otp: string) => {
        setVerifyOtp(otp)
        if (verifyOtp.length > 3) {
            
        }
    };

    return (
        <div className="flex flex-col gap-6 items-center justify-center py-[8%] min-h-[90vh] max-w-[340px] mx-auto">
             <div>
                <h1 className="font-bold md:text-[20px] text-[16px] text-center">
                    Verify Your Email Address
                </h1>
                <p className="mt-2 mb-3 text-center">We have sent you an OTP to verify your account. Input the OTP below to continue.</p>
            </div>
            <div className="w-full flex my-4 md:mx-auto sm:items-center justify-between">
                <InputOtp
                    value={verifyOtp.toUpperCase()}
                    containerStyle={{
                        width: "100%",
                        gap: "12px",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                    inputStyle={{
                        backgroundColor: "#fff",
                        border: !rest.error ? "1px solid #CFD9DE" : "1px solid #FFAFAF",
                        outlineColor: "#6FAEF6",
                        boxShadow: !rest.error ? "none" : "0px 0px 4px 0px #FF656566",
                        fontWeight: 500,
                        fontSize: "23px",
                        color: "#323232",
                        width: "48px",
                        height: "48px",
                        borderRadius: "8px",
                    }}
                    onChange={handleOtpChange}
                    numInputs={4}
                    renderSeparator={<> </>}
                    renderInput={(props) => <input {...props} className={className} />}
                />
            </div>
            
            <Button type="submit" className="w-full">{ false ? <Spinner size={16} className="animate-spin" /> : "Verify"}</Button>
        </div>
    )
}