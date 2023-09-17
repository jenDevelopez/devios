import FetchButton from "@/components/buttons/FetchButton"
import Hero from "@/components/hero/hero"
import ListProducts from "@/components/shop/listProducts"

export default async function Home() {
  
  return (
    <div className="h-screen ">
      <Hero />
      <ListProducts />
      <FetchButton />
    
    </div>
  )
}
