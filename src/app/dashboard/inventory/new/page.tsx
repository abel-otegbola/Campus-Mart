'use client'
import { useState } from "react";
import { IProduct } from "@/interface/store";
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import Textarea from "@/components/textarea/textarea";
import { Cube, HardDrive, ImageBroken, Palette, Trash, X } from "@phosphor-icons/react";
import { v7 } from "uuid";
import ImageToBase64 from "@/components/imageConverter/imageConverter";
import Image from "next/image";
import Dropdown from "@/components/dropdown/dropdown";

export default function Userproducts() {
    const [data, setData] = useState<IProduct>({ id: v7() } as IProduct)
    const [tag, setTag] = useState("")
    const [variations, setVariations] = useState<string[]>([])

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

    const variationsList = [
        { id: 0, title: "Color", icon: <Palette /> },
        { id: 1, title: "Size", icon: <Cube /> },
        { id: 2, title: "RAM", icon: <HardDrive /> },
    ]

    return (
        
        <>
        <div className="flex justify-between items-center gpa-6 flex-wrap pb-8">
            <div className="items-center">
                <h2 className="font-bold text-[28px] uppercase">New Product</h2>
                <p>Create a new product</p>
            </div>
            <Button size="small" variant="secondary">Save</Button>
        </div>
            <div className="w-full overflow-x-auto md:p-8 p-4 min-h-[400px] rounded-lg border border-gray-500/[0.1] bg-gray-100/[0.04]">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                    <div className="flex flex-col gap-4">
                        <Input id="title" label="Title" onChange={(e) => setData({ ...data, title: e.target.value })} placeholder="Enter product title" />
                        <Input id="category" label="Category" onChange={(e) => setData({ ...data, category: e.target.value })} placeholder="Enter product category" />
                        <Input id="price" label="Price" onChange={(e) => setData({ ...data, price: e.target.value })} placeholder="Enter product price" />
                        <Textarea id="descriptions" label="Description" onChange={(e) => setData({ ...data, title: e.target.value })} placeholder="Enter product descriptions" />
                        <div className="flex flex-col gap-2 bg-tetiary/[0.2] dark:bg-tetiary/[0.09] rounded">
                            <label htmlFor="tags">Tags</label>
                            <div className="flex items-start bg-tertiary dark:bg-black p-2 rounded">
                                <div className="flex flex-wrap max-w-[280px] gap-2">
                                {
                                    data?.tags?.map(tag => (
                                        <div key={tag} className="flex gap-2 text-[12px] px-2 py-1 border border-gray-500/[0.2] rounded w-fit">
                                            <span>{tag}</span>
                                            <button className="text-red" onClick={() => setData({ ...data, tags: data.tags.filter(item => item !== tag) })}><X size={12} /></button>
                                        </div>
                                    ))
                                }
                                </div>
                                <Input id="tags" value={tag} className="border-none w-[140px] py-1" onKeyDown={(e) => { e.key === "Enter" ? addTag() : "" }} onChange={(e) => setTag(e.target.value)} placeholder="Enter product tags" />
                                <Button size="small" variant="secondary" className="py-[12px]" onClick={() => addTag()}>Add</Button>
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
                                        { 
                                            image === "" ? 
                                            <label htmlFor={i.toString()} className="flex flex-col justify-center items-center gap-2 flex-1">
                                                <ImageBroken weight="fill" alt="add new image" size={32} />
                                                <p className="text-[10px]">Drop your image here, or <label htmlFor={i.toString( )} className="text-primary">Browse files</label></p>
                                                <div className="absolute top-2 left-2 p-2 bg-black/[0.9] rounded cursor-pointer" tabIndex={1} onClick={(e) => deleteImage(image)}><Trash size={16} className="text-red-500" /></div>
                                            </label>
                                            :
                                            <div className="flex">
                                                <Image src={image} alt="preview" width={88} height={88} className="max-h-auto w-full border border-gray-500/[0.2] rounded"/>
                                            </div>
                                        }
                                        <ImageToBase64 id={i.toString()} img={image} fullname={data?.title + i.toString()} setImg={(img) => changeImage(i, img)} />
                                        
                                    </div>
                                ) )
                            }
                                
                            </div>
                            <Button size="small" variant="secondary" onClick={() =>  setData({ ...data, images: data?.images ? [...data?.images, "" ] : [""]})}>New Image</Button>
                        </div>

                        <div className="flex flex-col gap-2 p-4 bg-gray-500/[0.09]">
                            <label htmlFor="images"> Variations</label>
                            <Dropdown placeholder="Add variation" label="Choose variation" options={variationsList.filter(item => !variations.includes(item.title))} value={"Color"} onChange={(value) =>  setVariations(!variations.includes(value) || value === "" ? [ value, ...variations ]: variations)}></Dropdown>
                            {
                                variations?.map(variation => (
                                    <div className="relative p-2 mb-2 border border-gray-500/[0.1]" key={variation}>
                                        {variation}
                                        <div className="absolute top-[6px] right-[6px] p-1 bg-black/[0.9] rounded cursor-pointer" tabIndex={1} onClick={(e) => setVariations(variations.filter(item => item !== variation))}><Trash size={16} className="text-red-500" /></div>

                                    </div>
                                ))
                            }
                        </div>
                        
                        <div className="flex flex-col gap-2 py-4">
                            <label htmlFor="stock">Stock</label>
                            <Input id="stock" type="number" onChange={(e) => setData({ ...data, stocks: +e.target.value })} placeholder="Number of product available" />
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-500/[0.2] py-4">
                    <Button variant="secondary">Save</Button>
                </div>
            </div>
        </>
    )
}
