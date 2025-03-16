'use client'
import Button from "@/components/button/button";
import Dropdown from "@/components/dropdown/dropdown";
import ImageToBase64 from "@/components/imageConverter/imageConverter";
import Input from "@/components/input/input";
import { AuthContext } from "@/context/useAuth";
import { ArrowRight, Bag, Bed, BeerBottle, Bicycle, Book, BookOpen, Briefcase, Bus, Car, Chair, Code, Coffee, File, FilmStrip, Football, GameController, GraduationCap, Guitar, Heart, House, ImageBroken, Laptop, MapPin, Palette, PawPrint, Pencil, ShirtFolded, Spinner, Storefront, Ticket, Trash, User, UserFocus, Watch } from "@phosphor-icons/react";
import { Formik } from "formik";
import Image from "next/image";
import { ReactNode, useContext, useState } from "react";
import { TbPerfume } from "react-icons/tb";
import { PiDiamond } from "react-icons/pi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type navTab =  {
    id: number | string,
    label: string,
    to: string,
    icon: ReactNode
}

export default function VendorOnboardingPage() {
    const { updateUser, loading } = useContext(AuthContext)
    const [active, setActive] = useState<string | undefined>("No")
    const [flow, setFlow] = useState(0)
    const { data } = useSession()
    const router = useRouter()

    const navTabs: navTab[] = [
        { id: 1, label: "Yes", to: "#", icon: <User/> },
        { id: 2, label: "No", to: "#", icon: <Storefront/> },
    ]
    const categories = [
        { id: 1, title: "Accommodation", icon: <House /> },
        { id: 2, title: "Art & Craft Supplies", icon: <Palette /> },
        { id: 3, title: "Bags & Backpacks", icon: <Bag /> },
        { id: 4, title: "Bicycles", icon: <Bicycle /> },
        { id: 5, title: "Books", icon: <Book /> },
        { id: 6, title: "Bedding & Home Essentials", icon: <Bed /> },
        { id: 7, title: "Bike & Car Accessories", icon: <Car /> },
        { id: 8, title: "Clothing", icon: <ShirtFolded /> },
        { id: 9, title: "Cosmetics & Skincare", icon: <BeerBottle /> },
        { id: 10, title: "Food & Beverages", icon: <Coffee /> },
        { id: 11, title: "Electronics", icon: <Laptop /> },
        { id: 12, title: "Event Tickets", icon: <Ticket /> },
        { id: 13, title: "Gaming", icon: <GameController /> },
        { id: 14, title: "Gadgets", icon: <Watch /> },
        { id: 15, title: "Health & Wellness", icon: <Heart /> },
        { id: 16, title: "Jewellery and Accessories", icon: <PiDiamond /> },
        { id: 17, title: "Part-time Jobs", icon: <Briefcase /> },
        { id: 18, title: "Pet Supplies", icon: <PawPrint /> },
        { id: 19, title: "Perfumes and Scents", icon: <TbPerfume /> },
        { id: 20, title: "Sports Equipment", icon: <Football /> },
        { id: 21, title: "Second-hand Textbooks", icon: <BookOpen /> },
        { id: 22, title: "Rending Services (CAC, SCRUM registration)", icon: <File /> },
        { id: 23, title: "Music Instruments", icon: <Guitar /> },
        { id: 24, title: "Movies & Entertainment", icon: <FilmStrip /> },
        { id: 25, title: "Software & Digital Tools", icon: <Code /> },
        { id: 26, title: "Stationery", icon: <Pencil /> },
        { id: 27, title: "Tutoring Services", icon: <GraduationCap /> },
        { id: 28, title: "Travel Accessories", icon: <Bus /> },
        { id: 29, title: "Furniture", icon: <Chair /> },
    ];
    


    return (
        <div className="min-h-[400px] flex sm:items-center justify-between">

            <div className="flex w-full">
                <div className="sm:w-[550px] mx-auto w-full sm:p-12 p-6">
                    
                    <div className="flex flex-col justify-center gap-6 md:p-[5%] md:py-[5%] py-[80px]">
                        <div className="text-center">
                            <div className="font-bold md:text-[18px] text-[14px] text-center">
                                <p>Setup your</p>
                                <p>
                                    <span className="ml-2 font-bold text-primary">CAMPUS</span>
                                    <span className="font-bold text-secondary mr-2">MART</span>
                                    vendor account
                                </p>
                            </div>
                        </div>

                        <Formik
                            initialValues={{ business_name: '', business_category: '', business_location: '', img: ''}}
                            onSubmit={( values, { setSubmitting }) => {
                                if(flow === 1) {
                                    updateUser( data?.user.email || "",
                                        { business_name: values.business_name, business_category: values.business_category, business_location: values.business_location, role: "Seller", img: values.img}
                                    );
                                    setSubmitting(false);
                                    router.push("/dashboard")
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
                                setFieldValue,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                            }) => (

                                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6 ">
                                    <div className="relative h-[310px] flex gap-[5%] overflow-hidden">
                                        <div className={`w-full flex flex-col gap-5 absolute top-0 left-0 duration-500 ${flow === 0 ? "translate-x-[0]" : "translate-x-[-120%]"}`}>
                                            <Input name="business_name" label="Business Name" value={values.business_name} onChange={handleChange} type={"text"} error={touched.business_name ? errors.business_name : ""} placeholder="Enter your business name" leftIcon={<UserFocus size={16}/>}/>
                                            
                                            <Dropdown name="business_category"  options={categories} label="Business Category" value={values.business_category} onChange={handleChange} error={touched.business_category ? errors.business_category : ""} placeholder="Choose your business category" />
                                            <Input name="business_location" label="Business Location (Institution)" value={values.business_location} onChange={handleChange} type="text" error={touched.business_location ? errors.business_location : ""} placeholder="Enter business location" leftIcon={<MapPin size={16}/>}/>
                                            
                                        </div>
                                        <div className={`w-full flex flex-col gap-5 absolute top-0 left-0 duration-500 ${flow === 1 ? "translate-x-[0]" : flow === 0 ? "translate-x-[120%]" : "translate-x-[-120%]"}`}>
                                            <p className="-mb-4">Upload Profile Picture</p>
                                            <div className="relative flex gap-6 items-center h-[100px] w-[100%] border border-dashed border-gray-300 rounded-lg">
                                                { 
                                                   values.img === "" ? 
                                                   <label htmlFor="add_img" className="flex flex-col justify-center items-center gap-2 flex-1">
                                                        <ImageBroken weight="fill" alt="add new image" size={32} />
                                                        <p className="text-[10px]">Drop your image here, or <label htmlFor="add_img" className="text-primary">Browse files</label></p>
                                                    </label>
                                                   :
                                                    <div className="flex">
                                                        <div className="flex items-center p-4 cursor-pointer" tabIndex={1} onClick={(e) => {setFieldValue("img", ""); e.stopPropagation()}}><Trash size={16} className="text-red-500" /></div>
                                                        <Image src={values.img} alt="preview" width={88} height={88} className="max-h-[88px] w-auto border border-gray-500/[0.2] rounded"/>
                                                    </div>
                                                }
                                                <ImageToBase64 id="add_img" fullname={data?.user.email || "user"} img={values?.img} setImg={(img) => setFieldValue("img", img)} />
                                                
                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex justify-between">
                                        {
                                            flow > 0 ?
                                            <span tabIndex={1} onClick={() => setFlow(flow -1)} className="px-6 py-3 border border-gray-300 rounded-[60px] cursor-pointer">
                                                { isSubmitting || loading ? <Spinner size={16} className="animate-spin" /> : "Back"}
                                            </span>
                                            :
                                            <span></span>
                                        }
                                        <Button type="submit" className="rounded-[80px]">
                                            { isSubmitting || loading ? <Spinner size={16} className="animate-spin" /> : flow === 1 ? "Finish" : "Next"}
                                            <ArrowRight />
                                        </Button>
                                    </div>

                                </form>
                            )}
                        </Formik>

                    </div>
                </div>
            </div>

        </div>
    )
}
