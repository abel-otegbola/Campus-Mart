'use client'
import { useEffect, useState } from "react"
import Button from "../button/button";
// import Button from "../button/button"
// import { CaretLeft, CaretRight } from "@phosphor-icons/react"

type ImagesProps = { images: { id: number | string, src: string, text: string }[] };

export default function Slider({ images }: ImagesProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [dragStartX, setDragStartX] = useState<number | null>(null);
    const [dragEndX, setDragEndX] = useState<number | null>(null);

    // Slider transition classes for three states
    const states = images.length > 2 ? [
        "left-[100%] w-full",
        "left-[0%] w-full",
        "left-[-100%] w-full",
    ] : [
      "left-[0%] w-full",
      "left-[-100%] w-full",
    ]

    const prevSlide = (): void => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    const nextSlide = (): void => {        
        setCurrentIndex(
            (prevIndex) => (prevIndex + 1 + images.length) % images.length
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if(images.length > 1) {
                nextSlide();
            }
        }, 6000);
        return () => {
            clearInterval(interval);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent): void => {
        const clientX =
          e.type === "touchstart"
            ? (e as React.TouchEvent).touches[0].clientX
            : (e as React.MouseEvent).clientX;
        setDragStartX(clientX);
    };

    const handleDragMove = (e: React.TouchEvent | React.MouseEvent): void => {
        if (!dragStartX) return;
        const clientX =
          e.type === "touchmove"
            ? (e as React.TouchEvent).touches[0].clientX
            : (e as React.MouseEvent).clientX;
        setDragEndX(clientX);
    };

    const handleDragEnd = (): void => {
        if (dragStartX !== null && dragEndX !== null) {
          const dragDistance = dragEndX - dragStartX;
          if (dragDistance > 50) {
              nextSlide();
          } else if (dragDistance < -50) {
              prevSlide();
          }
        }
        setDragStartX(null);
        setDragEndX(null);
    };

    // Dynamically render slides based on the number of images
    const getSlideIndex = (offset: number) => {
        const newIndex = (currentIndex + offset + images.length) % images.length;
        return newIndex;
    };

    return (
        <div className="relative flex items-center justify-center md:w-[84%] w-full mx-auto overflow-hidden">
            <div
                className="flex gap-[3%] md:h-[260px] h-[220px]"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                {
                images.length === 1 ?
                  <div
                      key={images[0]?.id}
                      className={`absolute flex flex-col gap-4 justify-center px-[5%] pb-[3%] top-0 md:h-[260px] h-[220px] ${states[0]} duration-700 bg-cover bg-center bg-no-repeat transition-all ease-in-out cursor-pointer`}
                      style={{
                          backgroundImage: `url("${images[0]?.src}")`,
                      }}
                    >
                      <p className="md:text-[28px] text-[20px] font-bold md:w-[60%] text-secondary-dark sm:w-[75%] w-[100%]">{images[0]?.text}</p>
                      <Button href="/shop" className="rounded-[40px]">ORDER NOW</Button>
                  </div>
                  :
                images.map((_, offset) => {
                    const slideIndex = getSlideIndex(offset - 1);
                    return (
                        <div
                            key={images[slideIndex]?.id}
                            className={`absolute flex flex-col gap-4 justify-center px-[5%] pb-[3%] top-0 md:h-[260px] h-[220px] ${states[offset]} duration-700 bg-cover bg-slate-200 md:bg-center bg-[center_left_40%] bg-no-repeat transition-all ease-in-out cursor-pointer`}
                            style={{
                                backgroundImage: `url("${images[slideIndex]?.src}")`,
                            }}
                        >
                            <p className="md:text-[28px] text-[20px] font-bold md:w-[60%] text-secondary-dark w-[75%]">{images[slideIndex]?.text}</p>
                            <Button href="/shop" className="rounded-full">ORDER NOW</Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
