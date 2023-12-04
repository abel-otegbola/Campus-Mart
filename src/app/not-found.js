import Button from "./components/button/page"

export default function Custom404() {
  return (
    <main className="">
      <header className="flex flex-col md:px-[30%] p-[5%] min-h-[80vh] md:items-center items-start justify-center sm:text-center">
        <h1 className="md:text-[44px] text-[30px] font-[700] text-[#5938DD]">404</h1>
        <p className="py-4">The page could not be found</p>
        <Button text={"Homepage"} to={"/"}/>

      </header>
    </main>
  )
}