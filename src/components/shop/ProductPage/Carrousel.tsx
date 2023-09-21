import { CarouselType } from '@/interfaces/types'
import Image from 'next/image'
import {AiOutlineRight, AiOutlineLeft} from 'react-icons/ai'
import { useEffect } from 'react'

export default function Carousel({images,currentImageIndex,goToNextImage,goToPreviousImage}:CarouselType) {
  
  


    
  
  return (
    <div className="relative">
    <div className="overflow-hidden w-full h-64 md:h-96">
      <Image
        src={`${images[currentImageIndex]}`}
        alt={`image ${currentImageIndex + 1}`}
        width={300}
        height={300}
        className="w-full h-auto object-cover transform transition-transform duration-300 hover:scale-110"
      />
    </div>
    <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
      <button
        onClick={goToPreviousImage}
        className="px-2 py-1 bg-gray-800 text-white rounded-l-md"
      >
        <AiOutlineLeft />
      </button>
    </div>
    <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
      <button
        onClick={goToNextImage}
        className="px-2 py-1 bg-gray-800 text-white rounded-r-md"
      >
        <AiOutlineRight />
      </button>
    </div>
  </div>
  )
}
