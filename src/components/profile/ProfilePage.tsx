'use client'

import { auth } from "@/app/firebaseConfig"
import { useDeviosStore } from "@/app/store/deviosStore"
import { useEffect } from "react"
import ProfileButtons from "../buttons/ProfileButtons"
import { useRouter } from "next/navigation"




export default function DataProfile() {
  const Component = useDeviosStore(state => state.activeComponent)
  const activeComponent = Component && <Component />
  const router = useRouter()
  useEffect(() => {
    const checkUser = () => {
      const user = auth.currentUser
      if(!user){
        router.replace('/login')
      
      }else{
        useDeviosStore.getState().setUser({
          uid:user.uid,
          displayName:user.displayName,
          phoneNumber:user.phoneNumber,
          email:user.email
        })
      }
    }

    checkUser()
  },[])

  return (
    <div className=" h-screen bg-binari bg-cover bg-center">
      <ProfileButtons />
      {activeComponent }
    </div>
  )
}
