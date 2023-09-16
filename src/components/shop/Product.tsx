import Image from "next/image"
import { AiOutlineHeart } from 'react-icons/ai'
import { useState } from "react"
import Link from "next/link"
import { ProductType } from "@/interfaces/types"


export default function Product({ id, name, description, price, image }: ProductType) {
  const [like, setLike] = useState(false)
  const handleLikeClick = () => {
    setLike(!like)

  }
  return (
    <Link href={`${id}`}>
      <div className="container-card max-w-sm   border-gray-200 bg-transparent  rounded-t-lg relative">
        <Image
          className="w-full rounded-t-lg"
          src={image[0]}
          alt={name}
          width={200}
          height={300}
        />
        <div className="">
          <p className="p-2 text-xs">{name}</p>
          <div className="flex flex-row justify-between items-center w-full px-2">
            <p>{price}€</p>

          </div>
        </div>
        <div className="rounded-full border bg-gray-300 w-6 h-6 grid place-items-center absolute top-[53%] right-1">
          <button onClick={handleLikeClick}>
            {like ? (
              <span>❤️</span>

            ) : (
              <AiOutlineHeart className="text-black" />
            )}
          </button>
        </div>
      </div>
    </Link>
  )
}
