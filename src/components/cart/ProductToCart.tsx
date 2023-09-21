"use client";
import Link from "next/link";
import { useDeviosStore } from "@/app/store/deviosStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
export default function ProductToCart() {
  const { cart, totalPrice } = useDeviosStore();
  const { addItemToCart, sustractItemToCart, calculateTotalCart, cleanCart } =
    useDeviosStore();

  useEffect(() => {
    calculateTotalCart();
  }, [cart, addItemToCart, sustractItemToCart, calculateTotalCart]);

  
  return (
    <div className="w-full">
      {cart.map((product) => (
        <div
          key={product.id}
          className="flex justiy-between items-center border my-2"
        >
          <div className="">
            <Image
              src={product.image}
              alt={`product ${product.id} `}
              width={100}
              height={100}
            />
          </div>
          <div className="flex flex-col justify-between items-start w-full gap-2">
            <div className="  w-full flex justify-between px-2">
              <p>{product.name}</p>
              <button
                onClick={() =>
                  useDeviosStore.getState().deleteProductFromCart(product.id)
                }
              >
                <RiDeleteBin6Line />
              </button>
            </div>
            <div className=" flex flex-row justify-between px-2 w-full">
              <div>
                <p>{product.size}</p>
              </div>
              <div className="flex justify-center items-center gap-2 ">
                <button
                  onClick={() =>
                    useDeviosStore.getState().sustractItemToCart(product.id)
                  }
                >
                  <BiMinus />
                </button>
                <p>{product.quantity}</p>
                <button
                  onClick={() =>
                    useDeviosStore.getState().addItemToCart(product.id)
                  }
                >
                  <BiPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="w-full grid h-screen place-items-center">
         {cart.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <div className="fixed bottom-0 w-full flex flex-col justify-end">

          <button onClick={cleanCart} className="self-end py-2 underline text-lg pl-2">Eliminar compra</button>
          <div className="w-full h-16 bg-[#D9D9D9] flex justify-between items center p-2">
            <p className="font-semibold text-xl text-black">Total</p>
            <p className="font-bold text-xl text-black">{totalPrice.toFixed(2)} €</p>
          </div>
          <div className="w-full bg-[#B2D6FF] h-12 p-2">
            <Link href="/payment" className=" w-full h-full cursor pointer  text-black font-bold text-xl  mx-auto">Tramitar pedido</Link>
          </div>
        </div>
      )}
      </div>
     
    </div>
  );
}
