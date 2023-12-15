import Button from "./components/button/page"
import { data } from "./data/projects"
import ProductCard from "./components/productCard/page"
import Image from "next/image"

export default function Home() {
  return (
    <main className="">

      <header className="md:flex md:px-[8%] p-[3%] md:py-[3%] py-[20%] md:items-center items-start justify-between">
        <div className="md:w-auto w-full">
          <h1 className="md:text-[44px] text-[30px] font-[700] text-blue">Campus Mart</h1>
          <p className="py-4">Discover, Trade, Thrive: Your Campus, Your Marketplace!</p>
          <Button text={"Join the waitlist"} to={"/login"} />
        </div>
        <div className="md:w-auto w-full flex flex-1 justify-center items-center">
          <Image src="/background.png" className="my-6" width={500} height={400} alt="background" />
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