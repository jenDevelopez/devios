import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import ListProducts from "./components/shop/listProducts"
import Products from "./components/products/listProducts"
import { cookies } from "next/headers"
import Nav from "./components/navbar/Navbar"

export default async function Home() {
  
  return (
    <div className="h-screen bg-slate-700">
      <Nav />
      <Products />
    
    </div>
  )
}
