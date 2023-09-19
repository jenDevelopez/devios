import { useDeviosStore } from '@/app/store/deviosStore';
import React from 'react'

export default function SizeSelector({price}:{price:number}) {
  const sizeSelected = useDeviosStore(state => state.sizeSelected)
  const setSizeSelected = useDeviosStore(state => state.setSizeSelected)
  
  const sizes = [,'Talla S Unisex', 'Talla M Unisex', 'Talla L Unisex', 'Talla XL Unisex']

  const handleSizeChange  = (e: any) => {
    const newSize = e.target.value;
    if (newSize !== undefined) {
      setSizeSelected(e.target.value);
    }
  };
  return (
    <div className='flex flex-col w-full'>
    {sizes.map((size,index) => (
      <div className='p-2 flex flex-row justify-between w-full border rounded-md my-1' key={index}>
        <p>
          {size}
        </p>
        <p>
          {price}
        </p>
      </div>
    ))}
  </div>
  )
}
