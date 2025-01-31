'use client'
import FacebookIcon from "@/assets/icons/facebook";
import GoogleIcon from "@/assets/icons/google";
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { AuthContext } from "@/context/useAuth";
import { loginSchema } from "@/schema/auth";
import { Envelope, LockKey, Spinner } from "@phosphor-icons/react";
import { Formik } from "formik";
import Link from "next/link";
import { useContext } from "react";

export default function Loginpage() {
    const { login, sociallogin, loading } = useContext(AuthContext)
    
    return (
        <div className="min-h-[400px] flex mt-4 md:mx-[12%] sm:items-center justify-between">

            <div className="flex w-full">
                <div className="sm:w-[550px] mx-auto w-full sm:p-12 p-6">
                    
                    <div className="flex flex-col justify-center items-center gap-6 md:p-[5%] md:py-[5%] py-[80px]">
                        <div>
                            <h1 className="font-bold md:text-[20px] text-[16px] text-center">
                                You are welcome to 
                                <span className="ml-2 font-bold text-primary">CAMPUS</span>
                                <span className="font-bold text-secondary">MART</span>
                            </h1>
                            <p className="mt-2 mb-3 text-center">Log in to your account or <Link href={"/register"} className="text-primary">Sign Up</Link> if you are yet to have one</p>
                        </div>

                        <Formik
                            initialValues={{ email: '', password: ''}}
                            validationSchema={loginSchema}
                            onSubmit={( values, { setSubmitting }) => {
                                login(values.email, values.password, '/dashboard');
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
                                    
                                    <Input name="email" label="" value={values.email} onChange={handleChange} type="email" error={touched.email ? errors.email : ""} placeholder="Email Address" leftIcon={<Envelope size={16}/>}/>

                                    <Input name="password" label="" value={values.password} onChange={handleChange} type={"password"} error={touched.password ? errors.password : ""} placeholder="Password" leftIcon={<LockKey size={16}/>}/>

                                    <Button type="submit" className="w-full">{ isSubmitting || loading ? <Spinner size={16} className="animate-spin" /> : "Sign in"}</Button>

                                </form>
                            )}
                        </Formik>
                        
                        <div className="grid grid-cols-3 w-full items-center py-6">
                            <span className="w-full h-[1px] bg-gray-300"></span>
                            <p className="mx-auto">Or Continue with</p>
                            <span className="w-full h-[1px] bg-gray-300"></span>
                        </div>

                        <div className="grid gap-4 grid-cols-2 w-full">

                        <Button variant="tetiary" onClick={() => sociallogin("/dashboard")} className="w-full bg-white dark:bg-black border-gray-500/[0.2] w-full"><FacebookIcon width={16} />Facebook</Button>
                        <Button variant="tetiary" onClick={() => sociallogin("/dashboard")} className="w-full bg-white dark:bg-black border-gray-500/[0.2] w-full"><GoogleIcon width={12} />Google</Button>
                        
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
