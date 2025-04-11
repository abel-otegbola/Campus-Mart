'use client';
import { useEffect, useState } from 'react';
import Button from '../button/button';
import Animate from '../animation/animate';

type ImagesProps = { images: { id: number | string; src: string; text: string }[] };

export default function Slider({ images }: ImagesProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [dragStartX, setDragStartX] = useState<number | null>(null);
    const [dragEndX, setDragEndX] = useState<number | null>(null);

    const states = images.length > 2
        ? ['left-[100%] w-full', 'left-[0%] w-full', 'left-[-100%] w-full']
        : ['left-[0%] w-full', 'left-[-100%] w-full'];

    const prevSlide = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const nextSlide = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (images.length > 1) {
                nextSlide();
            }
        }, 6000);

        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images.length]);

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent): void => {
        const clientX =
            e.type === 'touchstart'
                ? (e as React.TouchEvent).touches[0].clientX
                : (e as React.MouseEvent).clientX;
        setDragStartX(clientX);
    };

    const handleDragMove = (e: React.TouchEvent | React.MouseEvent): void => {
        if (!dragStartX) return;
        const clientX =
            e.type === 'touchmove'
                ? (e as React.TouchEvent).touches[0].clientX
                : (e as React.MouseEvent).clientX;
        setDragEndX(clientX);
    };

    const handleDragEnd = (): void => {
        if (dragStartX !== null && dragEndX !== null) {
            const dragDistance = dragEndX - dragStartX;
            if (dragDistance > 50) {
                prevSlide(); // Swipe right -> Previous slide
            } else if (dragDistance < -50) {
                nextSlide(); // Swipe left -> Next slide
            }
        }
        setDragStartX(null);
        setDragEndX(null);
    };

    const getSlideIndex = (offset: number): number => {
        return (currentIndex + offset + images.length) % images.length;
    };

    const handleKeyDown = (e: React.KeyboardEvent): void => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    };

    return (
        <div
            className="relative flex items-center justify-center w-full mx-auto overflow-hidden"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label="Image slider"
        >
            <div
                className="flex gap-[8%] md:h-[300px] h-[220px]"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                {images.map((_, offset) => {
                    const slideIndex = getSlideIndex(offset - 1);
                    return (
                        <div
                            key={images[slideIndex]?.id}
                            className={`absolute flex flex-col gap-4 justify-center px-[8%] pb-[3%] top-0 md:h-[300px] h-[220px] ${states[offset]} duration-700 bg-cover bg-slate-200 md:bg-center bg-[center_left_40%] bg-no-repeat transition-all ease-in-out cursor-pointer`}
                            style={{
                                backgroundImage: `url("${images[slideIndex]?.src}")`,
                            }}
                        >
                            <div className="md:text-[28px] text-[20px] font-medium md:w-[60%] text-white w-[75%]">
                                <Animate type="slideLeft">
                                    {images[slideIndex]?.text}
                                </Animate>
                            </div>
                            <Animate type='slideUp'>
                                <Button href="/shop" className="rounded-full">
                                    ORDER NOW
                                </Button>
                            </Animate>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}