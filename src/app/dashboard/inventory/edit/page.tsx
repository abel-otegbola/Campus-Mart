'use client'
import { useContext, useEffect, useState } from "react";
import { IProduct } from "@/interface/store";
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import Textarea from "@/components/textarea/textarea";
import { ImageBroken, Spinner, Trash, X } from "@phosphor-icons/react";
import ImageToBase64 from "@/components/imageConverter/imageConverter";
import Image from "next/image";
import { storeContext } from "@/context/useStore";
import { useSearchParams } from "next/navigation";
import { getSingleProduct } from "@/actions/useProducts";

export default function Userproducts() {
    const [data, setData] = useState<IProduct>({} as IProduct)
    const [tag, setTag] = useState("")
    const { updateProduct, loading } = useContext(storeContext)
    const searchParams = useSearchParams()
    const id = searchParams.get("id") || "0"

    useEffect(() => {
        if(id !== "0") {
            getSingleProduct(id)
            .then((response) => {
                if(response?.error) {                   
                }
                else {
                    setData(response)
                    console.log(response, id)
                }
            })
            .catch((error: { message: string }) => {
            });
        }
    }, [id])

    const addTag = () => {
        if(data.tags) {
            if(data?.tags?.indexOf(tag) === -1 && tag !== "") {
                setData({ ...data, tags: [ ...data.tags, tag ]})
                setTag("")
            }
        }
        else {
            setData({ ...data, tags: [ tag ]})
        }
    }

    const changeImage = (index: number, img: string) => {
        const newData = { ...data, images: data?.images.map((element: string, i: number) => {
            if(index === i) return img 
            else return element
        }) }
        setData(newData)
    }
    
    const deleteImage = (img: string) => {
        const newData = { ...data, images: data?.images.filter(item => item !== img) }
        setData(newData)
    }

    return (
        
        <>
        <div className="flex justify-between items-center gpa-6 flex-wrap pb-8">
            <div className="items-center">
                <h2 className="font-bold text-[28px] uppercase">Edit Product</h2>
                <p>Update the product information</p>
            </div>
            <Button size="small" variant="secondary"  onClick={() => updateProduct(data)}>{ loading ? <Spinner size={16} className="animate-spin" /> : "Save" }</Button>
        </div>
            <div className="w-full overflow-x-auto min-h-[400px]">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                    <div className="flex flex-col gap-4">
                        <Input id="title" label="Title" value={data?.title} onChange={(e) => setData({ ...data, title: e.target.value })} placeholder="Enter product title" />
                        <Input id="category" label="Category" value={data?.category} onChange={(e) => setData({ ...data, category: e.target.value })} placeholder="Enter product category" />
                        <Input id="price" label="Price" value={data?.price} onChange={(e) => setData({ ...data, price: e.target.value })} placeholder="Enter product price" />
                        <Textarea id="descriptions" label="Description" value={data?.description} onChange={(e) => setData({ ...data, description: e.target.value })} placeholder="Enter product descriptions" />
                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="tags">Tags</label>
                            <div className="flex flex-wrap items-start gap-2 border border-gray-500/[0.2] dark:bg-black p-2 rounded">
                                <div className="flex flex-wrap gap-2">
                                {
                                    data?.tags?.map(tag => (
                                        <div key={tag} className="flex gap-2 px-2 py-1 bg-white dark:bg-black text-[10px] border border-gray-500/[0.2] rounded w-fit">
                                            <span>{tag}</span>
                                            <button className="text-red" onClick={() => setData({ ...data, tags: data.tags.filter(item => item !== tag) })}><X size={10} /></button>
                                        </div>
                                    ))
                                }
                                </div>
                                <div className="flex items-center gap-2 min-w-[20%] max-w-[40%] justify-between flex-1">
                                    <Input id="tags" value={tag} className="border-none rounded-[4px] bg-transparent px-0 py-[2px]" onKeyDown={(e) => { e.key === "Enter" ? addTag() : "" }} onChange={(e) => setTag(e.target.value)} placeholder="Enter product tags" />
                                    <Button size="small" variant="secondary" className="py-[12px]" onClick={() => addTag()}>Add</Button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                    <div className="flex gap-4 flex-col">
                        <div className="flex flex-col gap-2 py-4">
                            <label htmlFor="images"> Images</label>
                            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-4 grid-cols-3 gap-2 h-[150px] gap-2 w-full overflow-x-auto bg-gray-500/[0.09] rounded p-2">
                            {
                                data?.images?.map((image: string, i: number) => (
                                    <div  key={i} className="relative flex flex-col gap-2 w-[100%] border border-dashed border-gray-300 rounded-lg p-2">
                                        <div className="absolute top-2 right-2 p-2 bg-black/[0.9] rounded cursor-pointer" tabIndex={1} onClick={(e) => deleteImage(image)}><X size={16} className="text-red-500" /></div>
                                        { 
                                            image === "" ? 
                                            <label htmlFor={i.toString()} className="flex flex-col justify-center items-center gap-2 flex-1">
                                                <ImageBroken weight="fill" alt="add new image" size={32} />
                                                <p className="text-[10px]">Drop your image here, or <label htmlFor={i.toString( )} className="text-primary">Browse files</label></p>
                                            </label>
                                            :
                                            <div className="flex">
                                                <Image src={image} alt="preview" width={88} height={88} className="max-h-[92px] w-auto border border-gray-500/[0.2] rounded"/>
                                            </div>
                                        }
                                        <ImageToBase64 id={i.toString()} img={image} fullname={data?.title + i.toString()} setImg={(img) => changeImage(i, img)} />
                                        
                                    </div>
                                ) )
                            }
                                
                            </div>
                            <Button size="small" variant="secondary" onClick={() =>  setData({ ...data, images: data?.images ? [...data?.images, "" ] : [""]})}>New Image</Button>
                        </div>
                        
                        <div className="flex flex-col gap-2 py-4">
                            <label htmlFor="stock">Stock</label>
                            <Input id="stock" type="number" value={data?.stocks} onChange={(e) => setData({ ...data, stocks: +e.target.value })} placeholder="Number of product available" />
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-500/[0.2] py-4">
                    <Button variant="secondary" onClick={() => updateProduct(data)}>{ loading ? <Spinner size={16} className="animate-spin" /> : "Save" }</Button>
                </div>
            </div>
        </>
    )
}
