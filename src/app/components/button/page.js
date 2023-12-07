export default function Button({ text, to, type }) {
    return (
        <button className={`bg-transparent border-none py-4 ${type === "long" ? "w-full" : ""}`} aria-label="Join the waitlist">
            <a className="block p-[12px] px-[20px] rounded-[5px] text-white bg-blue hover:bg-darkblue focus:bg-grayblue" href={to}>{text}</a>
        </button>
    )
}