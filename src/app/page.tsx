'use client'

import ProductCard from "@/components/cards/productCard";
import Slider from "@/components/slider/slider";
import { storeContext } from "@/context/useStore";
import { useContext } from "react";

export default function Home() {
  const { products } = useContext(storeContext)
  
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
            products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          }
        </div>

      </section>
      
    </main>
  );
}
