"use client";

import { ProductType } from "@/interfaces/types";
import { useDeviosStore } from "@/app/store/deviosStore";
import { useEffect } from "react"
import Image from "next/image";
import Link from "next/link";
import ProductCard from "./ProductCard";
// import { products } from '@/data/products';
export default function ListProducts() {
  const { products } = useDeviosStore();
  const fetchProducts = useDeviosStore((state) => state.fetchProducts);


  useEffect(() => {
    fetchProducts(6)
  },[])
 
  
  return (
    <div className="max-w-full px-4 m-auto grid gap-8 grid-cols-auto-fill-150px py-5 bg-gradient-to-r from-[#141A35] to-[#647A9C]">
      {products.map((product) => (
        <ProductCard key={product.model} id={product.id} name={product.name} model={product.model} price={product.price} images={product.images}    />
      ))}
    </div>
  );
}
