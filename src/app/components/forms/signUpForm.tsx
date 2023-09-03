"use client";
import { useDevios } from "@/app/hooks/useDevios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  name: string
  email: string
  password: string
  confirmPassword: string
  privacity: boolean

}

export default function SignUpForm() {
  const { setEmail, setPassword, signUp } = useDevios();
  const { register, handleSubmit, formState: { errors }, control, watch } = useForm<IFormInput>()
  const [visibility, setVisibility] = useState(false);
  const [secondVisibility, setSecondVisibility] = useState(false);
  const watchPassword = watch('password', '')
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    signUp(data.email, data.password)
  };


  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-1/2 flex flex-col justify-start gap-3 "
      >
        {/* Nombre */}
        {/* <div className="w-3/4 mx-auto flex flex-col justify-start">
          <label className="text-lg" htmlFor="name">

          </label>
          <input
            {...register('name',
              {
                required: 'Debe escribir un nombre ', 

              })}

            className="h-10 rounded-md px-2"
            type="text" placeholder="Nombre"
          />
          <span className="block text-sm text-red-400 ml-2">{errors.name?.message}</span>
        </div> */}
        {/* Email */}
        <div className="w-3/4 mx-auto flex flex-col justify-start">
          <label className="text-lg" htmlFor="email">

          </label>
          <input
            {...register('email', { required: 'Debe escribir un email válido' })}
            {...register('email')}
            className="h-10 rounded-md px-2"
            type="email" placeholder="Email"
          />
          <span className="block text-sm text-red-400 ml-2">{errors.email?.message}</span>
        </div>
        {/* Contraseña */}
        <div className="w-3/4 mx-auto flex flex-col justify-start relative">
          <label htmlFor="password"></label>
          <input type="password" {...register('password', {required: true, minLength: 8, maxLength: 12})} placeholder="Contraseña" className="rounded-md h-10 px-2" />
          {/* <input
            {...register('password', {
              required: true,
              pattern: /^[A-Za-z\d]{8,}$/,

              minLength:8,
              maxLength: 12
            })}
            className="h-10 rounded-md px-2"
            type="password"
            placeholder="Contraseña"
          />
          <div className="flex gap-3">
            <div
              className="h-8 w-8 border border-gray-400 rounded absolute top-1 right-2 flex justify-center items-center"
              onClick={() => setVisibility(!visibility)}>
              <BsEye className="h-6 w-6" />
            </div>
          </div> */}
          <span className="block text-sm text-red-400 ml-2">

            {errors.password?.type === 'required' ? errors.password.message = 'La contraseña debe tener letras y numeros' : errors.password?.type === 'minLength' ? errors.password.message = 'Debe contener al menos 8 caracteres' : errors.password?.type === 'maxLength' ? errors.password.message = 'La contraseña no puede tener mas de 12 caracteres' : null}</span>
        </div>

        {/* Confirmar contraseña */}
        {/* <div className="w-3/4 mx-auto flex flex-col justify-start relative">
          <label htmlFor="confirmPassword"></label>
          <input
            {...register('confirmPassword', {
              required: 'Debe ser igual a la contraseña',
              validate: value => value === watchPassword || 'Las contraseñas no coinciden'
            })}
            className="h-10 rounded-md px-2"
            type={secondVisibility ? "text" : "password"}
            placeholder="Confirmar contraseña"
          />
          <div className="flex gap-3">
            <div
              className="h-8 w-8 border border-gray-400 rounded absolute top-1 right-2 flex justify-center items-center"
              onClick={() => setSecondVisibility(!secondVisibility)}>
              <BsEye className="h-6 w-6" />
            </div>
          </div>
          <span className="block text-sm text-red-400 ml-2">{errors.confirmPassword?.message}</span>
        </div> */}

        {/* Terminos de privacidad */}
        <div className="flex flex-col">
          <div className="form-control  w-3/4 mx-auto flex flex-row items-center gap-2">
            <input
              type="checkbox"
              className="checkbox"
              {...register('privacity', {
                required: 'Debe aceptar los terminos de privacidad'
              })} />
            <label className="label cursor-pointer">
              <span className="text-sm ">Acepto los terminos y condiciones de privacidad</span>
            </label>
          </div>
          <span className="block text-sm text-red-400 ml-2 self-center">{errors.privacity?.message}</span>
        </div>


        <Link className="self-end w-1/3 ml-auto mr-5 text-center text-sm text-purple-400 active:text-purple-950" href="/login">
          Inicia sesion
        </Link>
        <input className="btn btn-active w-1/2 mx-auto" type="submit" />
      </form>

      <div>

      </div>
    </>
  );
}
