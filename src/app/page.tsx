'use client'

import { getShuffledProducts } from "@/actions/useProducts";
import ProductCard from "@/components/cards/productCard";
import Skeleton from "@/components/skeleton/skeleton";
import Slider from "@/components/slider/slider";
import { storeContext } from "@/context/useStore";
import { shuffleArray } from "@/helpers/shuffleProdcts";
import { IProduct } from "@/interface/store";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([] as IProduct[])
  
  useEffect(() => {
    setLoading(true)
    getShuffledProducts(10)
    .then((response) => {
        setLoading(false)
        if(response?.error) {
            setLoading(false)                    
        }
        else {
            setProducts(response)
            setLoading(false)
        }
    })
    .catch((error: { message: string }) => {
        setLoading(false)
    });
  }, [])

  return (
    <main className="">

      <Slider images={[
        { id: "0", src: "/bg2.webp", text: "Get Your Order Delivered Personally to You Anytime" },
        { id: "1", src: "/bg1.webp", text: "Search and Order Quality Products at your Convenience" },
      ]} />

      <section className="md:px-[8%] px-4 py-[20px]">
        <h1 className="md:text-[32px] text-[20px] font-bold py-6">Available Items</h1>

        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
          {
             loading ?
                [0, 1, 2, 3, 4].map(index => (
                    <div key={index} className="flex flex-col gap-2">
                        <Skeleton type="rectangle"/>
                        <Skeleton type="paragraph"/>
                    </div>
                ))                                    
            :
            shuffleArray(products)?.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          }
        </div>
      </section>
      
      <section className="md:px-[8%] px-4 py-[20px]">
        <div className="">
          
        </div>
      </section>
    </main>
  );
}
