import Search from "../search/page";

export default function Footer() {
    return (
        <footer className="flex flex-wrap justify-between md:p-[8%] p-[3%] py-[100px]">
            <ul className="lg:w-[25%] sm:w-[50%] w-full">
                <h2>Campus mart</h2>
                <p className="py-4">Discover, Trade, Thrive: Your Campus, Your Marketplace!</p>
                <Search />

                <li className="py-4"><a href="/">Home</a></li>
                <li className="py-4"><a href="/stores">Stores</a></li>
            </ul>

            <ul className="lg:w-[25%] sm:w-[50%] w-full">
                <li className="py-4"><a href="/">Help</a></li>
                <li className="py-4"><a href="/stores">Services</a></li>
                <li className="py-4"><a href="/stores">Contact Us</a></li>
            </ul>

            <ul className="lg:w-[25%] sm:w-[50%] w-full">
            </ul>
        </footer>

    )
}