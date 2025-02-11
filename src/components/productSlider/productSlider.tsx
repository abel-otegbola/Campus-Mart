'use client'
import { useEffect, useState } from "react"
import Button from "../button/button";
// import Button from "../button/button"
// import { CaretLeft, CaretRight } from "@phosphor-icons/react"

type ImagesProps = { images: { id: number | string, src: string, text: string }[] };

export default function ProductSlider({ images }: ImagesProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [dragStartX, setDragStartX] = useState<number | null>(null);
    const [dragEndX, setDragEndX] = useState<number | null>(null);

    // Slider transition classes for three states
    const states = images.length > 2 ? [
        "left-[100%]",
        "left-[0%]",
        "left-[-100%]",
        "left-[-100%]",
        "left-[-100%]",
    ] : [
      "left-[0%]",
      "left-[-100%]",
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
        <div className="relative flex items-center justify-center md:w-[84%] mx-auto overflow-hidden">
            <div
                className="flex gap-[3%] min-h-[550px]"
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
                      className={`flex flex-col min-h-[500px] absolute gap-4 justify-center px-[5%] pb-[3%] top-0 w-full ${states[0]} duration-700 bg-cover bg-center bg-no-repeat transition-all ease-in-out cursor-pointer`}
                      style={{
                          backgroundImage: `url("${images[0]?.src}")`,
                      }}
                    >
                  </div>
                  :
                images.map((_, offset) => {
                    const slideIndex = getSlideIndex(offset - 1);
                    return (
                        <div
                            key={images[slideIndex]?.id}
                            className={`flex flex-col min-h-[500px] absolute gap-4 justify-center px-[5%] pb-[3%] top-0 w-full ${states[offset]} duration-700 bg-cover bg-slate-200 bg-center bg-no-repeat transition-all ease-in-out cursor-pointer`}
                            style={{
                                backgroundImage: `url("${images[slideIndex]?.src}")`,
                            }}
                        >
                        </div>
                    );
                })}
            </div>

            <div className="absolute bottom-0 flex p-2 gap-1">
                <div className="flex justify-center mt-4">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 w-2 mx-1 rounded-full ${
                                index === currentIndex
                                    ? "bg-primary"
                                    : "bg-gray-300"
                            } transition-all duration-500 ease-in-out`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
