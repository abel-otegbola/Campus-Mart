
export default function InfiniteScroll({ texts }: { texts: {title: string, text: string}[] }) {
    return (
        <div
            x-data="{}"
            x-init="$nextTick(() => {
                let ul = $refs.logos;
                ul.insertAdjacentHTML('afterend', ul.outerHTML);
                ul.nextSibling.setAttribute('aria-hidden', 'true');
            })"
            className="w-full inline-flex gap-4 md:py-4 flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_40px,_black_calc(100%-40px),transparent_100%)]"
        >
            <ul x-ref="logos" className="flex items-center md:text-[12px] text-[10px] justify-center gap-4 md:justify-start sm:[&_li]:w-[324px] sm:[&_li]:mr-2 [&_li]:w-[300px] [&_text]:max-w-none animate-infinite-scroll">
                { 
                    texts.map(text => (
                        <li key={text.title}>
                            <p className="p-4 py-2">{text.text}</p>
                        </li>
                    ))
                }
            </ul>
            <ul x-ref="logos" className="flex items-center md:text-[12px] text-[10px] justify-center gap-4 md:justify-start sm:[&_li]:w-[324px] sm:[&_li]:mr-2 [&_li]:w-[300px] [&_text]:max-w-none animate-infinite-scroll">
                {
                    texts.map(text => (
                        <li key={text.title + "second"}>
                            <p className="p-4 py-2">{text.text}</p>
                        </li>
                    ))
                }
            </ul>               
        </div>
    )
}