"use client";
import {useState} from 'react'
import { ProductType } from "@/interfaces/types";
import { useDeviosStore } from "@/app/store/deviosStore";
import { useEffect } from "react"
import Image from "next/image";
import Link from "next/link";

export default function ListProducts() {
  const { products } = useDeviosStore();
  const fetchProducts = useDeviosStore((state) => state.fetchProducts);


  useEffect(() => {
    fetchProducts(6)
  },[fetchProducts])
 
  console.log(products)
  return (
    <div className="max-w-full px-4 m-auto grid gap-8 grid-cols-auto-fill-150px py-5 bg-gradient-to-r from-[#141A35] to-[#647A9C]">
      {products.map((product:ProductType) => (
        <Link key={product.id} href={`${product.model}`}>
          <div className="container-card max-w-sm   border-gray-200 bg-transparent  rounded-t-lg relative">
            <Image
              className="w-full rounded-t-lg"
              src={product.images[0]}
              alt={product.name}
              width={200}
              height={300}
            />
            <div>
              <p className="p-2 text-xs">{product.name}</p>
              <div className="flex flex-row justify-between items-center w-full px-2">
                <p>{product.price}€</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
