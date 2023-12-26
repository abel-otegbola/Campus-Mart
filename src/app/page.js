'use client'
import { data } from "./data/projects"
import ProductCard from "./components/productCard/page"
import Image from "next/image"
import { useState } from "react"
import { PiMagnifyingGlassLight } from "react-icons/pi"

export default function Home() {
  const [focused, setFocused] = useState(false)

  return (
    <main className="">

      <header className="md:flex flex-col md:px-[8%] p-[3%] bg-gradient-to-tr from-blue/[0.1] to-white dark:to-black md:py-[3%] py-[20%] md:items-center items-start justify-between">
        <div className="md:w-auto w-full md:text-center">
          <h1 className="md:text-[44px] text-[30px] font-[700] text-transparent bg-clip-text bg-gradient-to-r from-blue via-red to-green">Campus Mart</h1>
          <p className="py-4">Discover, Trade, Thrive: Your Campus, Your Marketplace!</p>
          <form className={`flex items-center px-2 my-4 rounded-full border-gray-400 border dark:border-gray-600 outline-blue/[0.3] outline-offset-2 outline`}>
            <PiMagnifyingGlassLight className="text-[20px]"/>
            <input 
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                type="search" 
                className={`border-none bg-transparent p-3 px-3 text-[12px] outline-none flex-1`} 
                placeholder="Search products, services..." 
            />
          </form>
        </div>
        <div className="md:w-auto w-full flex flex-1 justify-center items-center">
        
        </div> 
      </header>

      <section className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-4 gap-2 md:px-[8%] sm:p-[3%] p-1">
        {
          data.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </section>

    </main>
  )
}