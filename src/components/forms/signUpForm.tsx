'use client'
import Link from "next/link";
import { useDeviosStore } from "@/app/store/deviosStore";
import { FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function SignUpForm() {
  const router = useRouter()
  const {signUp,setEmail,setPassword,setFullName} = useDeviosStore(state => ({
    signUp: state.createUserWithPassword, 
    setEmail: state.setEmail, 
    setPassword: state.setPassword, 
    signInWithPassword:state.signInWithPassword,
    setFullName:state.setFullName
  }))

  const {email,password} = useDeviosStore(state => ({
    email:state.email,
    password: state.password,
    fullName:state.fullName

  }))
  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()
    signUp(email,password)
  }

  return (
    <div className="h-screen flex flex-col  bg-binari bg-cover bg-center">
      <h1 className="text-4xl text-center my-3">Registrate</h1>
      <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col gap-3 mt-6">
        {/* Nombre */}
        <div className="w-3/4 mx-auto flex flex-col">
          <label className="text-lg" htmlFor="name">Nombre</label>
          <input
            required
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            className="h-8  px-2 bg-transparent border-b-[1px] border-b-white rounded-none"
            
          />
        </div>
        {/* Email */}
        <div className="w-3/4 mx-auto flex flex-col justify-start">
          <label className="text-lg" htmlFor="email">Email</label>
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            className="h-8  px-2 bg-transparent border-b-[1px] border-b-white rounded-none"
            type="email"
          />
        </div>
        {/* Password */}
        <div className="w-3/4 mx-auto flex flex-col justify-start relative">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            required
            minLength={8}
            maxLength={12}
            onChange={(e) => setPassword(e.target.value)}  
            className="h-8  px-2 bg-transparent border-b-[1px] border-b-white rounded-none"
          />
         
        </div>
        <Link
          className="self-end w-2/3 ml-auto mr-5 text-center text-sm text-white"
          href="/login"
        >
          ¿Ya tienes cuenta? Inicia sesion
         
        </Link>
        <button type="submit" className="btn w-1/2 font-bold mx-auto bg-[#B2D7FE] text-[#232496]">Enviar</button>
      </form>
    </div>

  );
}
