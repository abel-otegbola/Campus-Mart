export default function Button({ text, to }) {
    return (
        <button className="bg-transparent border-none py-4" aria-label="Join the waitlist">
            <a className="p-[12px] px-[20px] rounded-[5px] text-white bg-[#5938DD] hover:bg-[#3C279C] focus:bg-[#45348C]" href={to}>{text}</a>
        </button>
    )
}