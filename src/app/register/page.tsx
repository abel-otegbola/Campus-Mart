'use client'
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import Radio from "@/components/radio/radio";
import { AuthContext } from "@/context/useAuth";
import { registerBuyerSchema } from "@/schema/auth";
import { ArrowRight, Envelope, LockKey, Spinner, Storefront, User, UserCircle } from "@phosphor-icons/react";
import { Formik } from "formik";
import Link from "next/link";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type navTab =  {
    id: number | string,
    label: string,
    to: string,
    icon: ReactNode
}

export default function Registerpage() {
    const { signUp, loading } = useContext(AuthContext)
    const [active, setActive] = useState<string | undefined>("Yes")
    const searchParams = useSearchParams()
    const fullname = searchParams.get("fullname")
    const email = searchParams.get("email")

    const navTabs: navTab[] = [
        { id: 1, label: "Yes", to: "#", icon: <User/> },
        { id: 2, label: "No", to: "#", icon: <Storefront/> },
    ]
    
    useEffect(() => {
        if(email) {
            setActive("No")
        }
    }, [email])
    


    return (
        <div className="min-h-[400px] flex sm:items-center justify-between">

            <div className="flex w-full">
                <div style={{ backgroundImage: "url('/bg-register.webp')" }} className="h-[100vh] sticky top-0 w-[40%] md:block hidden bg-cover bg-center">
                </div>
                <div className="sm:w-[550px] mx-auto w-full sm:p-12 p-6">
                    
                    <div className="flex flex-col justify-center gap-6 md:p-[5%] md:py-[5%] py-[80px]">
                        <div className="text-center">
                            <div className="font-bold md:text-[24px] text-[16px] text-center">
                                <p>Create Your </p>
                                <p>
                                    <span className="ml-2 font-bold text-primary">CAMPUS</span>
                                    <span className="font-bold text-secondary mr-2">MART</span>
                                    Account
                                </p>
                            </div>
                        </div>

                        <Formik
                            initialValues={{ fullname: fullname || '', email: email || '', password: ''}}
                            validationSchema={registerBuyerSchema}
                            onSubmit={( values, { setSubmitting }) => {
                                signUp({
                                    email: values.email.trim(), 
                                    password: values.password, 
                                    fullname: values.fullname, 
                                    role: active === "Yes" ? "Seller" : "Buyer",
                                    verified: false
                                })
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
                                    <div className="relative h-[360px] flex gap-[5%] overflow-hidden">
                                        <div className={`w-full flex flex-col gap-5 absolute top-0 left-0 duration-500`}>
                                            <Input name="fullname" label="Full Name" disabled={fullname ? true : false} value={fullname ? fullname : values.fullname} onChange={handleChange} type="text" error={touched.fullname ? errors.fullname : ""} placeholder="Full name" leftIcon={<UserCircle size={16}/>}/>
                                            <Input name="email" label="Email Address" disabled={email ? true : false} value={email ? email : values.email} onChange={handleChange} type="email" error={touched.email ? errors.email : ""} placeholder="Email Address" leftIcon={<Envelope size={16}/>}/>
                                            <Input name="password" label="Password" value={values.password} onChange={handleChange} type={"password"} error={touched.password ? errors.password : ""} placeholder="Password" leftIcon={<LockKey size={16}/>}/>
                                            <div>
                                                <p>Are you a Business Owner?</p>
                                                <div className="flex mt-2 gap-8">
                                                {
                                                    navTabs.map((tab: navTab) => (
                                                        <Radio key={tab.id} id={tab.label} name="business_or_buyer" onCheck={(value) => setActive(value)} value={tab.label} active={active || ""} label={tab.label}/>
                                                    ))
                                                }
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="flex justify-between">
                                        <span></span>
                                        <Button type="submit" className="rounded-[80px]">
                                            { isSubmitting || loading ? <Spinner size={16} className="animate-spin" /> : active === "No" ? "Submit" : "Next"}
                                            <ArrowRight />
                                        </Button>
                                    </div>

                                </form>
                            )}
                        </Formik>

                        
                        <p className="text-center">Already have an account? <Link href={"/login"} className="text-primary">Sign in</Link></p>
                    </div>
                </div>
            </div>

        </div>
    )
}
