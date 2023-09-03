import LoginForm from "../components/forms/LoginForm";
import { GoogleButton } from "../components/buttons/googleButton";
import { GithubButton } from "../components/buttons/githubButton";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Nav from "../components/navbar/Navbar";

export default async function Login() {
 
  
  return (
    <>
    
    <Nav />
    <div className="h-screen flex flex-col bg-base-100">
      <h1 className="text-2xl text-center font-bold my-3">Inicia sesión</h1>
      <div className=" w-full md:w-2/3 mx-auto h-full lg:h-1/2">
        <LoginForm />
        <div className="divider">O</div>
        <div className="flex flex-col justify-center items-center gap-3">
          <GoogleButton/>
          <GithubButton />
        </div>
      </div>
    </div>
    </>
  );
}

