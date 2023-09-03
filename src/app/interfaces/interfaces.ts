import { SupabaseClient } from "@supabase/auth-helpers-nextjs"
import { Dispatch, SetStateAction } from "react"
import type { Session, User } from "@supabase/auth-helpers-nextjs"
import { Database } from "./database"


export interface DeviosContextProps {
  signWithGoogle: () => Promise<void>
  signWithGithub: () =>  Promise<void>
  signOut : () => Promise<void>
  getSession: () => Promise<Session | null>
  signUp: (email: string, password:string) => Promise<void>
  signWithPassword: (email: string, password:string) => Promise<void>
  getProducts: () => Promise<any[] | null>
  getUser: () => Promise<void>
  signWithEmail: (email: string) => Promise<void>
  loged: boolean
  setLoged: Dispatch<SetStateAction<boolean>>
  email: string | undefined
  setEmail: Dispatch<SetStateAction<string | undefined>>
  password: string
  setPassword: Dispatch<SetStateAction<string>>
  // name: string | undefined
  // setName: Dispatch<SetStateAction<string | undefined>>
  image:string
  setImage: Dispatch<SetStateAction<string>>
  supabase: SupabaseClient
}