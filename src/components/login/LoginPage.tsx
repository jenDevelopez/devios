'use client'
import LoginForm from "@/components/forms/LoginForm";


import { GoogleButton } from "../buttons/GoogleButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDeviosStore } from "@/app/store/deviosStore";

export default  function LoginPage() {
  const user = useDeviosStore(state => state.user)
  const router = useRouter()
  const getSession = useDeviosStore(state => state.checkAuthState)
  const cart = useDeviosStore(state => state.cart)

  useEffect(() => {
    getSession()
  
    if(user && cart.length === 0) {
      router.replace('/profile')
    }
    if(user && cart.length > 0) {
      router.replace('/payment')
    }

    console.log(user)
  }
  ,[user,router,getSession])

  return (
    <>
      <div className="h-screen flex flex-col  bg-binari bg-cover bg-center">
        <h1 className="text-2xl text-center font-bold my-3">Inicia sesión</h1>
        <div className=" w-full h-full mx-auto  justify-around md:w-2/3 lg:h-1/2">
           <div className="flex flex-col justify-center items-center gap-3 pt-5">
            <GoogleButton />
          </div>
          <div className="divider">O</div>
           <LoginForm />
        </div>
      </div>
    </>
  )
}