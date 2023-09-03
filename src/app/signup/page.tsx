import SignUpForm from "../components/forms/signUpForm"
export default function SignUp() {
  return (
    <div className="h-screen flex flex-col ">
      <h1 className="text-2xl text-center font-bold mt-5 mb-10">Registrate</h1>
      <div className=" w-full md:w-2/3 mx-auto h-full lg:h-1/2">
        <SignUpForm />
        
      </div>
    </div>
  )
}
