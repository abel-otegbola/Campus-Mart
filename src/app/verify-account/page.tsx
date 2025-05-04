'use client'
import { updateUserData } from "@/actions/useProfile";
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { AuthContext } from "@/context/useAuth";
import { sendOTP } from "@/helpers/sendOTP";
import { loginSchema, verifyOTPSchema } from "@/schema/auth";
import { LockKey, Spinner } from "@phosphor-icons/react";
import { Formik } from "formik";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";

export default function AccountVerifypage() {
    const { loading, verifyOTP } = useContext(AuthContext)
    const { data } = useSession()

    const resendOTP = () => {
        const otp = Math.floor(Math.random() * 1000000);
        const time = Date.now() + 10 * 60 * 1000;
        updateUserData(data?.user.email || "", { otp: otp.toString(), otpEpiry: time.toString() })
        .then(() => {
            sendOTP(otp, new Date(time).toLocaleString(), data?.user.email || "")
        })
        .catch((e) => {
            console.log(e)
        })
    }
    
    return (
        <div className="min-h-[400px] flex mt-4 md:mx-[12%] sm:items-center justify-between">

            <div className="flex w-full">
                <div className="sm:w-[550px] mx-auto w-full sm:p-12 p-6">
                    
                    <div className="flex flex-col justify-center items-center gap-6 md:p-[5%] md:py-[5%] py-[80px]">
                        <div>
                            <h1 className="font-bold md:text-[20px] text-[16px] text-center">
                                Verify Your Account
                            </h1>
                            <p className="mt-2 mb-3 text-center">Check your email for verification code</p>
                        </div>

                        <Formik
                            initialValues={{ otp: ''}}
                            validationSchema={verifyOTPSchema}
                            onSubmit={( values, { setSubmitting }) => {
                                verifyOTP(data?.user.email || "", values.otp)// confirm otp
                                setSubmitting(false);
                            }}
                            >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                            }) => (

                                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6 ">
                                    <Input name="otp" label="" value={values.otp} onChange={handleChange} type={"otp"} error={touched.otp ? errors.otp : ""} placeholder="Enter code" leftIcon={<LockKey size={16}/>}/>

                                    <Button type="submit" className="w-full">{ isSubmitting || loading ? <Spinner size={16} className="animate-spin" /> : "Verify"}</Button>

                                </form>
                            )}
                        </Formik>
                        <div>
                            <p> <button onClick={() => resendOTP()} className="text-primary">Resend OTP </button></p>
                        </div>
                        <div>
                            <p className="text-center">Having problems signing in?</p>
                            <p> <Link href={"/contact"} className="text-primary">Contact </Link>our Customer Service Team </p>
                        </div>

                        <h1 className="font-bold text-[20px] text-center">
                            <span className="ml-2 font-bold text-primary">CAMPUS</span>
                            <span className="font-bold text-secondary">MART</span>
                        </h1>
                    </div>
                </div>
            </div>

        </div>
    )
}
