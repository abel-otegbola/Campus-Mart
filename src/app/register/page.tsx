'use client'
import Button from "@/components/button/button";
import Dropdown from "@/components/dropdown/dropdown";
import Input from "@/components/input/input";
import Radio from "@/components/radio/radio";
import { AuthContext } from "@/context/useAuth";
import { registerSchema } from "@/schema/auth";
import { ArrowLeft, ArrowRight, Bicycle, Book, BoxArrowUp, Briefcase, Bus, Chair, Coffee, Envelope, FilmStrip, Football, GameController, GraduationCap, Guitar, Heart, House, Image, Laptop, LockKey, MapPin, Palette, PawPrint, Pencil, ShirtFolded, Spinner, Storefront, Ticket, User, UserCircle, Watch } from "@phosphor-icons/react";
import { Formik } from "formik";
import Link from "next/link";
import { ReactNode, useContext, useState } from "react";
import { TbPerfume } from "react-icons/tb";

type navTab =  {
    id: number | string,
    label: string,
    to: string,
    icon: ReactNode
}

export default function Registerpage() {
    const { signUp, loading } = useContext(AuthContext)
    const [active, setActive] = useState<string | undefined>("No")
    const [flow, setFlow] = useState(0)

    const navTabs: navTab[] = [
        { id: 1, label: "Yes", to: "#", icon: <User/> },
        { id: 2, label: "No", to: "#", icon: <Storefront/> },
    ]

    return (
        <div className="min-h-[400px] flex sm:items-center justify-between">

            <div className="flex w-full">
                <div style={{ backgroundImage: "url('/bg-register.png')" }} className="h-[100vh] w-[40%] md:block hidden bg-cover bg-center">
                </div>
                <div className="sm:w-[550px] mx-auto w-full p-12">
                    
                    <div className="flex flex-col gap-6 md:p-[5%] p-2">
                        <div className="text-center">
                            <div className="font-bold text-[24px] text-center">
                                <p>Create Your </p>
                                <p>
                                    <span className="ml-2 font-bold text-primary">CAMPUS</span>
                                    <span className="font-bold text-secondary mr-2">MART</span>
                                    Account
                                </p>
                            </div>
                        </div>

                        <Formik
                            initialValues={{ fullname: '', email: '', password: '', business_category: '', business_location: ''}}
                            validationSchema={registerSchema}
                            onSubmit={( values, { setSubmitting }) => {
                                if(flow === 2) {
                                signUp(
                                    active === "Buyer" ?
                                    {email: values.email, password: values.password, fullname: values.fullname}
                                    :
                                    {email: values.email, password: values.password, fullname: values.fullname, business_category: values.business_category, business_location: values.business_location}
                                );
                                setSubmitting(false);
                                }
                                else if(flow === 1) {
                                    setFlow(2)
                                    setSubmitting(false);
                                }
                                else {
                                    setFlow(1)
                                    setSubmitting(false);
                                }
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

                                    
                                    <div className="relative h-[310px] flex gap-[5%] overflow-hidden">
                                        <div className={`w-full flex flex-col gap-5 absolute top-0 left-0 duration-500 ${flow === 0 ? "translate-x-[0]" : "translate-x-[-120%]"}`}>
                                            <Input name="fullname" label="Full Name" value={values.fullname} onChange={handleChange} type="text" error={touched.fullname ? errors.fullname : ""} placeholder="Full name" leftIcon={<UserCircle size={16}/>}/>
                                            <Input name="email" label="Email Address" value={values.email} onChange={handleChange} type="email" error={touched.email ? errors.email : ""} placeholder="Email Address" leftIcon={<Envelope size={16}/>}/>
                                            <Input name="password" label="Password" value={values.password} onChange={handleChange} type={"password"} error={touched.password ? errors.password : ""} placeholder="Password" leftIcon={<LockKey size={16}/>}/>
                                            <div>
                                                <p>Are you a Business Owner?</p>
                                                <div className="flex mt-2 gap-8">
                                                {
                                                    navTabs.map((tab: navTab) => (
                                                        <Radio key={tab.id} id={tab.label} name="business_or_buyer" onCheck={(value) => {setActive(value); console.log(tab.label)}} value={tab.label} label={tab.label}/>
                                                    ))
                                                }
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`w-full flex flex-col gap-5 absolute top-0 left-0 duration-500 ${flow === 1 ? "translate-x-[0]" : flow === 0 ? "translate-x-[120%]" : "translate-x-[-120%]"}`}>
                                            <Dropdown name="business_category"  options={
                                                [
                                                    { id: 0, title: "Gadgets", icon: <Watch /> },
                                                    { id: 1, title: "Books", icon: <Book /> },
                                                    { id: 2, title: "Clothing", icon: <ShirtFolded /> },
                                                    { id: 3, title: "Stationery", icon: <Pencil /> },
                                                    { id: 4, title: "Electronics", icon: <Laptop /> },
                                                    { id: 5, title: "Furniture", icon: <Chair /> },
                                                    { id: 6, title: "Sports Equipment", icon: <Football /> },
                                                    { id: 7, title: "Music Instruments", icon: <Guitar /> },
                                                    { id: 8, title: "Bicycles", icon: <Bicycle /> },
                                                    { id: 9, title: "Food & Beverages", icon: <Coffee /> },
                                                    { id: 10, title: "Tutoring Services", icon: <GraduationCap /> },
                                                    { id: 11, title: "Accommodation", icon: <House /> },
                                                    { id: 12, title: "Event Tickets", icon: <Ticket /> },
                                                    { id: 13, title: "Health & Wellness", icon: <Heart /> },
                                                    { id: 14, title: "Part-time Jobs", icon: <Briefcase /> },
                                                    { id: 15, title: "Art & Craft Supplies", icon: <Palette /> },
                                                    { id: 16, title: "Travel Accessories", icon: <Bus /> },
                                                    { id: 17, title: "Gaming", icon: <GameController /> },
                                                    { id: 18, title: "Movies & Entertainment", icon: <FilmStrip /> },
                                                    { id: 19, title: "Pet Supplies", icon: <PawPrint /> },
                                                    { id: 20, title: "Perfumes and Scents", icon: <TbPerfume /> }
                                                  ]                                                  
                                            } label="Business Category" value={values.business_category} onChange={handleChange} error={touched.business_category ? errors.business_category : ""} placeholder="Choose your business category" />
                                            <Input name="business_location" label="Business Location" value={values.business_location} onChange={handleChange} type="text" error={touched.business_location ? errors.business_location : ""} placeholder="Enter business location" leftIcon={<MapPin size={16}/>}/>
                                            <p className="-mb-4">Upload Profile Picture</p>
                                            <label htmlFor="add_img" className="flex flex-col justify-center items-center h-[100px] w-[100%] border border-dashed border-gray-300 rounded-lg">
                                                <Image weight="fill" alt="add new image" size={32} />
                                                <p className="text-[10px]">Drop your image here, or <label htmlFor="add_img" className="text-primary">Browse files</label></p>
                                                <input type="file" className="hidden" id="add_img" />
                                            </label>
                                        </div>
                                    </div>


                                    <div className="flex justify-between">
                                        {
                                            flow > 0 ?
                                            <button onClick={() => setFlow(flow-1)} type="submit" className="px-6 border border-gray-300 rounded-[60px]">
                                                { isSubmitting || loading ? <Spinner size={16} className="animate-spin" /> : "Back"}
                                            </button>
                                            :
                                            <span></span>
                                        }
                                        <Button type="submit" className="rounded-[60px]">
                                            { isSubmitting || loading ? <Spinner size={16} className="animate-spin" /> : "Next"}
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
