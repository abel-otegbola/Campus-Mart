'use client'

import { getShuffledProducts } from "@/actions/useProducts";
import ProductCard from "@/components/cards/productCard";
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
        { id: "0", src: "/bg4.png", text: "Get Your Order Delivered Personally to You Anytime" },
        { id: "1", src: "/bg4.png", text: "Search and Order Quality Products at your Convenience" },
      ]} />

      <section className="md:px-[8%] px-4 py-[20px]">
        <h1 className="md:text-[32px] text-[20px] font-bold py-6">Available Items</h1>

        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
          {
            shuffleArray(products).map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          }
        </div>
      </section>
      
    </main>
  );
}
