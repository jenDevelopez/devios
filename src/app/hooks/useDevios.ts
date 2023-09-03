'use client'
import { useContext } from "react"
import { DeviosContext } from "../context/DevioContext"
export function useDevios() {
  const devios = useContext(DeviosContext)
  return devios
}