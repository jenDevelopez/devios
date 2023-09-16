import Hero from "@/components/hero/hero"
import ListProducts from "@/components/shop/listProducts"

export default async function Home() {
  
  return (
    <div className="h-screen ">
      <Hero />
      <ListProducts />
    
    </div>
  )
}
