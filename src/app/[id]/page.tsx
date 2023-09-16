'use client'
import { products } from "@/data/data"
import { useDeviosStore } from "../store/deviosStore"
import {  useEffect } from "react"
interface params {
    id: string
}
export default function DataProduct({params}:{params:params}) {
    const id = params
    const product = products.find((product => product.id === id.id))
    
    useEffect(() => {
        console.log(product)
    },[])
  return (
    <div>
        <h1 className="text-white text-4xl">{id.id}</h1>
    </div>
  )
}
