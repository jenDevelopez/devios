import LoginForm from "@/components/forms/LoginForm";


import { GoogleButton } from "@/components/buttons/googleButton"
import { GithubButton } from "@/components/buttons/githubButton"

export default async function Login() {

  return (
    <>
      <div className="h-screen flex flex-col bg-base-100">
        <h1 className="text-2xl text-center font-bold my-3">Inicia sesión</h1>
        <div className=" w-full h-full mx-auto  justify-around md:w-2/3 lg:h-1/2">
           <div className="flex flex-col justify-center items-center gap-3 pt-5">
            <GoogleButton />
            <GithubButton />
            {/* <FacebookButton /> */}
          </div>
          <div className="divider">O</div>
           <LoginForm />
        </div>
      </div>
    </>
  )
}