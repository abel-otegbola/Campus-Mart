'use client'

import ProductCard from "@/components/cards/productCard";
import Slider from "@/components/slider/slider";
import { gadgets } from "@/data/products";

export default function Home() {
  
  return (
    <main className="">

      <Slider images={[
        { id: "0", src: "/bg4.png", text: "Get Your Order Delivered Personally to Your Department" },
        { id: "1", src: "/bg4.png", text: "Get Your Order Delivered Personally to Your Department"  },
        { id: "2", src: "/bg4.png", text: "Get Your Order Delivered Personally to Your Department"  },
      ]} />

      <section className="md:px-[8%] px-4 py-[20px]">
        <h1 className="text-[32px] font-bold py-6">Available Items</h1>

        <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
          {
            gadgets.map(gadget => (
              <ProductCard key={gadget.id} product={gadget} />
            ))
          }
        </div>

      </section>
      
    </main>
  );
}
