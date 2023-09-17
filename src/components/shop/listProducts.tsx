'use client'
import Product from "./Product";
import { ProductType } from '@/interfaces/types';
import { useDeviosStore } from '@/app/store/deviosStore';
import { useEffect } from 'react';

export default function ListProducts() {
  const products = useDeviosStore(state => state.products)
  const fetchProducts = useDeviosStore(state => state.fetchProducts)
  useEffect(() => {
    fetchProducts(4)
    console.log(products)
  },[])
  return (
    <div className="max-w-[90%] m-auto grid gap-8 grid-cols-auto-fill-150px py-5">
      {products.map((product:ProductType) => (
       <Product key={product.id}  id={product.id} description={product.description} image={product.image} price={product.price} name={product.name}/>
      ))}

    </div>
  );
}
