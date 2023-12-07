import Button from "./components/button/page"

export default function Home() {
  return (
    <main className="">
      <header className="flex flex-col md:px-[30%] p-[3%] min-h-[80vh] md:items-center items-start justify-center md:text-center">
        <h1 className="md:text-[44px] text-[30px] font-[700] text-blue">Campus Mart</h1>
        <p className="py-4">The website is currently under construction. Sign up now and receive cool bonus and incentives when the website is fully functional.</p>
        <Button text={"Join the waitlist"} to={"/login"} />

      </header>
    </main>
  )
}