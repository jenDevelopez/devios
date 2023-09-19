'use client'

import Link from "next/link";
import { useDeviosStore } from "@/app/store/deviosStore";
import { FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function LoginForm() {
  const router = useRouter()
  //estados
  const {email,password} = useDeviosStore(state => ({
    email: state.email,
    password:state.password
  }))

  //funciones
  const {signInWithPassword,setEmail,setPassword,checkAuthState} = useDeviosStore(state => ({
    signInWithPassword: state.signInWithPassword,
    setEmail: state.setEmail,
    setPassword: state.setPassword,
    checkAuthState:state.checkAuthState
  }))
  
  

  const handleSubmit = () => {
    signInWithPassword(email,password)
  }
  
  
  return (
    <>

      <form autoComplete="off" onSubmit={handleSubmit} className="h-1/2 flex flex-col  gap-2">
        <div className="w-3/4 mx-auto flex flex-col justify-start">
          <label className="text-lg" htmlFor="name">
            Email
          </label>
          <input className="h-8  pl-2 bg-transparent border-b-[1px] border-b-white rounded-none" type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className=" w-3/4 mx-auto flex flex-col justify-center">
          <label htmlFor="password">Contraseña</label>
          <input className="h-8  pl-2 bg-transparent border-b-[1px] border-b-white rounded-non" type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="flex flex-row justify-between px-2  w-4/5 m-auto">
          <Link className="text-white text-sm" href="/resetPassword">¿Contraseña olvidada?</Link>
          <Link className=" text-white text-sm " href="/signup">Regístrate</Link>
        </div>
        <button type="submit" className="btn w-1/2 mx-auto bg-[#B2D7FE] text-[#232496]">Iniciar sesion</button>
      </form>

    </>
  );
}
