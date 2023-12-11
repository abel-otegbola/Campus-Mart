import Button from "./components/button/page"
import { data } from "./data/projects"
import ProductCard from "./components/productCard/page"

export default function Home() {
  return (
    <main className="">
      <header className="flex flex-col md:px-[30%] p-[3%] min-h-[80vh] md:items-center items-start justify-center md:text-center">
        <h1 className="md:text-[44px] text-[30px] font-[700] text-blue">Campus Mart</h1>
        <p className="py-4">Discover, Trade, Thrive: Your Campus, Your Marketplace!</p>
        <Button text={"Join the waitlist"} to={"/login"} />

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