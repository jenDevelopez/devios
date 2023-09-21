"use client";
import { useEffect } from "react";
import { useDeviosStore } from "@/app/store/deviosStore";
import Carrusel from "./Carrousel";
import { ProductToCartType, ProductType } from "@/interfaces/types";
import ProductToCart from "@/components/cart/ProductToCart";

function ProductPage({ model }: { model: string }) {
  const findProduct = useDeviosStore((state) => state.findProduct);
  const product = useDeviosStore((state) => state.product);
  const currrentIndexImage = useDeviosStore((state) => state.currentImageIndex);
  const goToNextImage = useDeviosStore((state) => state.goToNextImage);
  const goToPrevImage = useDeviosStore((state) => state.goToPreviousImage);
  const sizes = useDeviosStore((state) => state.sizes);
  const sizeSelected = useDeviosStore((state) => state.sizeSelected);
  const setSizeSelected = useDeviosStore((state) => state.setSizeSelected);
  const setProductToCart = useDeviosStore( state => state.setProductToCart)
  const cart = useDeviosStore((state) => state.cart);
  const setCart = useDeviosStore((state) => state.setCart);


  const addProductToCart = useDeviosStore((state) => state.addProductToCart);
  const addProduct = () => {
    addProductToCart(product.id,product.name,sizeSelected,product.price,product.images[0])
  }

  const handleAddSize = (size:string | undefined) => {
    if(size !== undefined){
      setSizeSelected(size)
    }
  }


  useEffect(() => {
    findProduct(model);
  }, [findProduct, model]);

  console.log(cart)
  return (
    <div className="h-screen bg-binari bg-cover bg-center  ">
      {/* En el carrusel a veces se carga y a veces no */}
      {/* <Carrusel images={product.images} currentImageIndex={currrentIndexImage} goToNextImage={goToNextImage} goToPreviousImage={goToPrevImage}/> */}
      <div className="flex justify-center py-2 font-semibold">
        <p>{product.name}</p>
      </div>
      {/* Selector de talla */}
      <div className="">
        <ul className="flex flex-col w-full">
          {sizes.map((size) => (
            <li
              className={`  ${
                sizeSelected === size ? "bg-blue text-black" : ""
              }`}
              key={size}
            >
              <button
                onClick={() => handleAddSize(size)}
                className=" flex flex-row justify-between w-full border rounded-md my-1 p-2"
              >
                <p>{size}</p>
                <p>{product.price}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className=" p-2 my-2 flex justify-end">
        <button onClick={addProduct} className='btn w-full bg-[#B2D7FE]  text-[#232946]'>Añadir</button>
      </div>
      <div className=" fixed bottom-0 mb-2 mx-2">
        <table className="table">
          <thead className="">
            <tr className="border-black h-4">
              <th className="bg-blue-300 border-black text-slate-900">
                Camiseta unisex
              </th>
              <th className="bg-blue-300 border-black text-slate-800">S</th>
              <th className="bg-blue-300 border-black text-slate-800">M</th>
              <th className="bg-blue-300 border-black text-slate-800">L</th>
              <th className="bg-blue-300 border-black text-slate-800 ">XL</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-black">
              <th className="border-black bg-blue-300  text-slate-900">
                Ancho de la camiseta(cm)
              </th>
              <td className="border-black bg-white text-black">50</td>
              <td className="border-black bg-white text-black">53</td>
              <td className="border-black bg-white text-black">56</td>
              <td className="border-black-black bg-white text-black">58</td>
            </tr>
            <tr className="border-black">
              <th className="bg-blue-300 border-black text-slate-900">
                Largo de la camiseta(cm)
              </th>
              <td className="border-black bg-white text-black">69</td>
              <td className="border-black bg-white text-black">72</td>
              <td className="border-black bg-white text-black">74</td>
              <td className="border-black bg-white text-black">76</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductPage;
