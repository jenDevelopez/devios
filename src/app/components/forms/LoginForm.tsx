'use client'
import { useDevios } from "@/app/hooks/useDevios";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  email: string
  password: string
}

export default function LoginForm() {
  const {signWithEmail} = useDevios()
  const {register, handleSubmit} = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    signWithEmail(data.email)
  }
  return (
    <>
   
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="h-1/2 flex flex-col justify-center gap-5 ">
      <div className="w-3/4 mx-auto flex flex-col justify-start">
        <label className="text-lg text-center pb-3" htmlFor="name">
          Email
        </label>
        <input  {...register('email')} className="h-10 rounded-md pl-2" type="email" />
      </div>
      {/* <div className=" w-3/4 mx-auto flex flex-col justify-start">
        <label htmlFor="password">Contraseña</label>
        <input {...register('password')} className="h-10 rounded-md pl-2" type="password" />
      </div>  */}
       <Link className=" pr-5 text-purple-400 self-end mr-5" href="/signup">Regístrate</Link> 
      <button type="submit" className="btn w-1/2 mx-auto">Iniciar sesion</button>
    </form>
    <div className="flex justify-end">      
    </div>
    </>
  );
}
