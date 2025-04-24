'use client'

import { getShuffledProducts } from "@/actions/useProducts";
import Animate from "@/components/animation/animate";
import Button from "@/components/button/button";
import ProductCard from "@/components/cards/productCard";
import Skeleton from "@/components/skeleton/skeleton";
import InfiniteScroll from "@/components/slider/infiniteScroll"
import { shuffleArray } from "@/helpers/shuffleProdcts";
import { IProduct } from "@/interface/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

      <Slider {...settings} className="w-full rounded-lg w-full h-full">
      {
        [
          { id: "0", src: "/bg2.webp", text: "Get Your Order Delivered Personally to You Anytime" },
          { id: "1", src: "/bg1.webp", text: "Search and Order Quality Products at your Convenience" },
        ].map((img, index) => (
              <div
                  key={img.id}
                  className={`relative flex flex-col gap-4 justify-center md:px-[8%] px-4 pb-[3%] top-0 md:h-[340px] h-[240px]`}
                  
              >
              <Image alt={img.src} key={index} fill={true} className={`absolute top-0 left-0 w-full h-full bg-cover bg-center object-cover`} 
                  src={img.src}
              />
                <div className="h-full flex flex-col gap-4 justify-center">
                  <div className="md:text-[28px] md:text-[20px] text-[18px] font-medium md:w-[60%] text-white w-[75%]">
                      <Animate type="slideLeft">
                          {img?.text}
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

      <section className="md:px-[8%] px-4 py-[20px]">
        <Animate type="slideUp">
          <h1 className="md:text-[32px] text-[20px] font-medium py-6">Available Items</h1>
        </Animate>

        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
          {
             loading ?
                [0, 1, 2, 3, 4].map(index => (
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
      
      <section className="md:px-[8%] px-4 py-5 flex flex-col gap-4 mb-6">
        <Animate type="slideUp">
          <h2 className="font-medium md:text-[24px] text-[18px]">Find Your Masterpiece</h2>
        </Animate>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <Button href={"/login"} variant="secondary" className="border-black dark:border-gray-500/[0.3] text-black dark:text-white rounded-[40px] md:text-[12px] text-[10px]">
            JOIN NOW
          </Button>
        </div>
        
      </section>

      <section>
        <Animate type="zoomIn">
          <div className="flex flex-col justify-between relative w-full h-[600px] bg-cover bg-center text-white" style={{ backgroundImage: 'url("/bg3.webp")' }}>
            <InfiniteScroll texts={[ 
              { title: "folders", text: "Folders - Organize your dcuments with style" } ,
              { title: "journals", text: "Journals - Write your thoughts, ideas and dreams" } ,
              { title: "backpacks", text: "Backpacks - Stylish, durable and comfortable" } ,
            ]}
            />
            <div className="flex gap-4 md:px-[8%] md:pb-8 p-4 z-[2]">
              <Image src="/journal.png" alt="product" width={150} height={160} className="md:w-[150px] w-[100px] md:h-[160px] h-[110px] bg-cover bg-center bg-slate-200 rounded-[16px]" />
              <div className="flex flex-col md:gap-4 gap-1 max-w-[300px] md:w-full w-[60%] py-2">
                <h2 className="md:text-[24px] text-[16px] leading-[100%]">Creative Stationery</h2>
                <p className="md:text-[12px] text-[10px]">Brighten up your notes and documents. Durable, comfortable and stylish</p>
                <Button href="/shop" variant="secondary" className="border-white text-white rounded-[40px] md:text-[12px] text-[10px]">SHOP NOW</Button>
              </div>
            </div>
          </div>
        </Animate>
      </section>

      <section className="flex flex-col md:px-[8%] px-4 py-[60px] w-full">
        <div className="flex flex-col gap-4">
          <Animate type="slideUp">
            <h2 className="font-medium md:text-[24px] text-[18px]">Buy Gadgets</h2>
          </Animate>
          {/* <Animate type="slideUp">
            <p className="md:w-[50%] w-full"></p>
          </Animate> */}
        </div>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 py-6">
          {
             loading ?
                [0, 1, 2, 3, 4].map(index => (
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
    </main>
  );
}
