'use client'
import { useDevios } from "@/app/hooks/useDevios";
import Link from "next/link";
import { useEffect, useState } from "react";



export default function ButtonLoginClient() {
  const { signOut, getSession,loged } = useDevios()
    getSession()

  useEffect(() => {
  
  },[])
  return (
    <>
      {loged === false ? (
        <button><Link href="/login">Iniciar sesion</Link></button>
      ) : (
        <button onClick={signOut}>Cerrar sesión</button>
      )}

    </>

  )
}
