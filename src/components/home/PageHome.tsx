"use client";
import { useEffect } from "react";
import { useDeviosStore } from "../../app/store/deviosStore";
import Hero from "@/components/hero/hero";
import ListProducts from "@/components/shop/listProducts";
import FetchButton from "@/components/buttons/FetchButton";
export default function PageHome() {
  const { isLoading } = useDeviosStore();
  const { setIsLoading } = useDeviosStore();
  useEffect(() => {
    const time = 3000

    setTimeout(() => {
      setIsLoading(false);
    }, time);
  }, []);
  return (
    <div className={`${isLoading ? 'w-full h-screen grid place-items-center' : 'h-screen bg-gradient-to-r from-[#141A35] to-[#647A9C]'}`}>
      {isLoading ? (
        <span className="loading loading-ring loading-lg"></span>
      ) : (
        <>
         <Hero />
          <ListProducts />
          <FetchButton />
        </>
      )}
    </div>
  );
}
