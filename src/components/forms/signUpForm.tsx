'use client'
import Link from "next/link";
import { useDeviosStore } from "@/app/store/deviosStore";
import { FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function SignUpForm() {
  const router = useRouter()
  const {signUp,setEmail,setPassword,addNewUser,setFullName} = useDeviosStore(state => ({
    signUp: state.createUserWithPassword, 
    setEmail: state.setEmail, 
    setPassword: state.setPassword, 
    signInWithPassword:state.signInWithPassword,
    addNewUser:state.addNewUser,
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
    <>
      <h1 className="text-4xl text-center my-3">Registrate</h1>
      <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col gap-3 mt-6">
        {/* Nombre */}
        <div className="w-3/4 mx-auto flex flex-col justify-start">
          <label className="text-lg" htmlFor="name"></label>
          <input
            required
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            className="h-10 rounded-md px-2"
            placeholder="Nombre"
          />
        </div>
        {/* Email */}
        <div className="w-3/4 mx-auto flex flex-col justify-start">
          <label className="text-lg" htmlFor="email"></label>
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 rounded-md px-2"
            type="email"
            placeholder="Email"
          />
          <span className="block text-sm text-red-400 ml-2"></span>
        </div>
        {/* Password */}
        <div className="w-3/4 mx-auto flex flex-col justify-start relative">
          <label htmlFor="password"></label>
          <input
            type="password"
            required
            minLength={8}
            maxLength={12}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="rounded-md h-10 px-2"
          />
          <span className="block text-sm text-red-400 ml-2"></span>
        </div>
        <Link
          className="self-end w-1/3 ml-auto mr-5 text-center text-sm text-purple-400 active:text-purple-950"
          href="/login"
        >
          ¿Ya tienes cuenta?
          <span className="block">Inicia sesion</span>
        </Link>
        <input className="btn btn-active w-1/2 mx-auto" type="submit" />
      </form>
    </>

  );
}
