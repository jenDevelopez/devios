'use client'
import { products } from '@/data/data';
import Product from "./Product";
import { ProductType } from '@/interfaces/types';


export default function ListProducts() {
 
  return (
    <div className="max-w-[90%] m-auto grid gap-8 grid-cols-auto-fill-150px py-5">
      {products.map((product:ProductType) => (
       <Product key={product.id}  id={product.id} description={product.description} image={product.image} price={product.price} name={product.name}/>
      ))}

    </div>
  );
}
