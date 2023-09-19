"use client";
import { useEffect } from "react";
// import Carousel from "./Carrousel";
import { useDeviosStore } from "@/app/store/deviosStore";
import SizeSelector from "./SizeSelector";

import ButtonAddCart from "@/components/buttons/ButtonAddCart";
function ProductPage({ model }: { model: string }) {
  const findProduct = useDeviosStore((state) => state.findProduct);
  const product = useDeviosStore((state) => state.product);
  // const currrentIndexImage = useDeviosStore((state) => state.currentImageIndex);
  // const goToNextImage = useDeviosStore((state) => state.goToNextImage);
  // const goToPrevImage = useDeviosStore((state) => state.goToPreviousImage);

  useEffect(() => {
    findProduct(model);
  }, [findProduct,model]);

  return (
    <div>
      
      <div className="flex justify-center py-2 font-semibold">
        <p>{product.name}</p>
      </div>
      <div className="flex justify-between">
        <SizeSelector price={product.price} />
      </div>
      <div className=" p-2 my-2 flex justify-end">
        <ButtonAddCart />
      </div>
    </div>
  );
}

export default ProductPage;
