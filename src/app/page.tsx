'use client'

import { getShuffledProducts } from "@/actions/useProducts";
import Animate from "@/components/animation/animate";
import Button from "@/components/button/button";
import ProductCard from "@/components/cards/productCard";
import Skeleton from "@/components/skeleton/skeleton";
import { shuffleArray } from "@/helpers/shuffleProdcts";
import { IProduct } from "@/interface/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([] as IProduct[])
  
  useEffect(() => {
    setLoading(true)
    getShuffledProducts(10)
    .then((response) => {
        setLoading(false)
        if(response?.error) {
            setLoading(false)                    
        }
        else {
            setProducts(response)
            setLoading(false)
        }
    })
    .catch((error: { message: string }) => {
        setLoading(false)
    });
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
};

  return (
    <main className="">

      <Slider {...settings} className="w-full h-full overflow-hidden">
      {
        [
          { id: "0", src: "/bg1.webp", text: "Students Shopping Made Easy", subtext: "Shop what you need, when you need it. From textbooks to trending gear, buy and sell with ease" },
          { id: "1", src: "/bg2.webp", text: "Quality Products for you", subtext: "Discover Trusted Quality. Your Go-to source for reliable student-to-student shopping." },
        ].map((img, index) => (
              <div
                  key={img.id}
                  className={`relative flex flex-col gap-4 justify-center md:px-[8%] px-4 pb-[3%] top-0 md:h-[340px] h-[240px]`}
                  
              >
              <Image alt={img.src} key={index} fill={true} className={`absolute top-0 left-0 w-[2000px] h-[1050px] bg-cover bg-center object-cover`} 
                  src={img.src}
              />
                <div className="h-full flex flex-col gap-6 justify-center">
                  <div className="lg:text-[32px] md:text-[20px] text-[18px] font-black md:w-[60%] text-white w-[75%] -mb-4">
                      <Animate type="slideLeft">
                          {img?.text}
                      </Animate>
                  </div> 
                  <div className="md:w-[50%] text-white w-[75%]">
                      <Animate type="slideLeft">
                          {img?.subtext}
                      </Animate>
                  </div>
                  <Animate type='slideUp'>
                      <Button href="/shop" className="rounded-full">
                          ORDER NOW
                      </Button>
                  </Animate>
                </div>
              </div>

          ))     
      }
      </Slider>

      <section className="md:px-[8%] px-4 md:py-[60px] py-[20px] overflow-hidden bg-[#FBFBFB] dark:bg-gray-500/[0.1]">
        <Slider className="" autoplay={true} autoplaySpeed={4000} infinite={true} dots={false} speed={400} slidesToShow={6} slidesToScroll={1} responsive={[{ breakpoint: 1000, settings: { slidesToShow: 5, slidesToScroll: 1 } }, { breakpoint: 600, settings: { slidesToShow: 4, slidesToScroll: 1 } }]}>
          {
            ["phone", "fashion", "laptop", "stationery", "food", "accessories", "perfumes", ].map(cat => (
              <Link href={"/shop?query=" + cat} className="flex gap-2 flex-col items-center md:p-2 md:pb-3 p-1 pb-2 md:rounded-lg rounded bg-white dark:bg-black md:max-w-[136px] max-w-[88px]" key={cat}>
                <Image alt={cat} width={120} height={116} className={`md:w-[120px] w-[80px] md:h-[116px] h-[76px] bg-cover bg-center object-cover`} 
                  src={"/cat/cat-" + cat + ".png"}
                />
                <p className="capitalize w-full text-center mt-2 md:text-[12px] text-[10px]">{cat}</p>
              </Link>
            ))
          }
        </Slider>
      </section>

      <section className="md:px-[8%] px-4 py-[20px]">
        <Animate type="slideUp">
          <h1 className="md:text-[36px] text-[28px] font-black py-6 uppercase">Available Items</h1>
        </Animate>

        <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
          {
             loading ?
                [0, 1, 2, 3, 4, 5].map(index => (
                    <div key={index} className="flex flex-col gap-2">
                        <Skeleton type="rectangle"/>
                        <Skeleton type="paragraph"/>
                    </div>
                ))                                    
            :
            shuffleArray(products)?.map((product, i) => (
              <ProductCard key={product._id} product={product} i={i}/>
            ))
          }
        </div>
      </section>

      <section className="flex flex-col md:px-[8%] py-[60px] w-full">
        <div className="flex flex-col gap-4">
         <div
          className={`relative flex flex-col gap-4 justify-center border-b border-gray-500/[0.2] md:px-[8%] px-4 pb-[3%] top-0 md:h-[380px] h-[240px] bg-cover bg-center`} 
          style={{ backgroundImage: 'url("/bg-gadgets.webp")' }}
          >
                <div className="h-full flex flex-col gap-6 justify-center">
                  <div className="lg:text-[36px] md:text-[32px] uppercase text-[18px] font-black md:w-[60%] text-white w-[75%] -mb-4 mt-12">
                      <Animate type="slideLeft">
                          Quality gadgets
                      </Animate>
                  </div> 
                  <Animate type='slideUp'>
                      <Button href="/shop" className="rounded-full">
                          Shop now
                      </Button>
                  </Animate>
                </div>
              </div>
        </div>
        <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 py-6">
          {
             loading ?
                [0, 1, 2, 3, 4, 5].map(index => (
                    <div key={index} className="flex flex-col gap-2">
                        <Skeleton type="rectangle"/>
                        <Skeleton type="paragraph"/>
                    </div>
                ))                                    
            :
            shuffleArray(products?.filter(item => item.category.toLowerCase().includes("gadget")))?.map((product, i) => (
              <ProductCard key={product._id} product={product} i={i}/>
            ))
          }
        </div>
      </section>

       <section className="flex flex-col md:px-[8%] py-[60px] w-full">
        <div className="flex flex-col gap-4">
         <div
          className={`relative flex flex-col gap-4 justify-center border-b border-gray-500/[0.2] md:px-[8%] px-4 pb-[3%] top-0 md:h-[400px] h-[240px] bg-cover bg-center`} 
          style={{ backgroundImage: 'url("/bg-stationery.webp")' }}
          >
                <div className="h-full flex flex-col gap-6 justify-center">
                  <div className="lg:text-[36px] md:text-[32px] uppercase md:leading-[40px] leading-[24px] text-[18px] font-black md:w-[60%] dark:text-white text-black w-[75%] -mb-4 mt-12">
                      <Animate type="slideLeft">
                          Your one-stop shop for stationery
                      </Animate>
                  </div> 
                  <Animate type='slideUp'>
                      <Button href="/shop" className="rounded-full">
                          Shop now
                      </Button>
                  </Animate>
                </div>
              </div>
        </div>
        <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 py-6">
          {
             loading ?
                [0, 1, 2, 3, 4, 5].map(index => (
                    <div key={index} className="flex flex-col gap-2">
                        <Skeleton type="rectangle"/>
                        <Skeleton type="paragraph"/>
                    </div>
                ))                                    
            :
            shuffleArray(products?.filter(item => item.category.toLowerCase().includes("stationery")))?.map((product, i) => (
              <ProductCard key={product._id} product={product} i={i}/>
            ))
          }
        </div>
      </section>
    </main>
  );
}
