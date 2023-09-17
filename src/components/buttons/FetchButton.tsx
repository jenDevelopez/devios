"use client";
import { useDeviosStore } from "@/app/store/deviosStore";
import React from "react";

export default function FetchButton() {
  const fetchMore = useDeviosStore((state) => state.fetchMoreProducts);
  const hasMore = useDeviosStore((state) => state.hasMoreProducts);

  const fetchMoreProducts = () => {
    fetchMore(4);
  };
  return (
    <div className="w-full flex justify-center">
      {hasMore ? (
        <button
          onClick={fetchMoreProducts}
          className="bg-[#B2D7FE] text-[#232946] px-4 py-2 rounded-md w-[90%] mx-auto font-bold"
        >
          MOSTRAR MÁS
        </button>
      ) : (
        <p className="bg-[#B2D7FE] text-[#232946] px-4 py-2 rounded-md w-[90%] mx-auto font-bold text-center">
          NO HAY MÁS PRODUCTOS
        </p>
      )}
    </div>
  );
}
