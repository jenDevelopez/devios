import FetchButton from "@/components/buttons/FetchButton"
import Hero from "@/components/hero/hero"
import ListProducts from "@/components/shop/listProducts"

export default async function Home() {
  
  return (
    <div className="h-screen bg-gradient-to-r from-[#141A35] to-[#647A9C]">
      <Hero />
      <ListProducts />
      <FetchButton />
    
    </div>
  )
}
