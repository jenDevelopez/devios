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
          <label className="text-lg pb-3" htmlFor="name">
            Email
          </label>
          <input className="h-10 rounded-md pl-2" type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className=" w-3/4 mx-auto flex flex-col justify-start">
          <label htmlFor="password">Contraseña</label>
          <input className="h-10 rounded-md pl-2" type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="flex flex-row justify-between px-2 border w-4/5 m-auto justify-self-start">
          <Link className="text-purple-400 text-sm" href="/resetPassword">¿Contraseña olvidada?</Link>
          <Link className=" text-purple-400 text-sm " href="/signup">Regístrate</Link>
        </div>
        <button type="submit" className="btn w-1/2 mx-auto">Iniciar sesion</button>
        
      </form>

    </>
  );
}
