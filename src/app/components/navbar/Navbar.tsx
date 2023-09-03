"use client";
import { useEffect, useState } from 'react'
import Link from "next/link";
import { useDevios } from '@/app/hooks/useDevios';
import { RxHamburgerMenu } from "react-icons/rx";
import {
  AiOutlineClose,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineRight,
  AiOutlineSearch,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import { BiCopyright } from "react-icons/bi";
import { TbWorld } from "react-icons/tb";

export default function Nav() {
  const {getSession,signOut,loged,getUser,email,image} = useDevios()
  const [isOpen, setIsOpen] = useState(false);
  const today = new Date();
  const year = today.getFullYear();
 
  useEffect(() => {
    getSession()
    getUser()
  },[getSession, getUser])


  return (
    <nav>
      <div className={"w-full h-16 flex justify-between items-center"}>
        <div className="w-1/5  h-full flex justify-center items-center">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? (
              <AiOutlineClose className="text-white" size={30} />
            ) : (
              <RxHamburgerMenu className="text-white" size={30} />
            )}
          </button>
        </div>
        <div className="w-4/5  h-full  flex justify-between items-center px-3">
          <Link href="/">
            <span className="text-white">DEVIOS</span>
          </Link>
          <div className="flex justify-around w-3/6 h-full items-center">
            <Link href="#">
              <AiOutlineHeart size={30} className="text-black" />
            </Link>
            <Link href="#">
              <AiOutlineShoppingCart size={30} className="text-black" />
            </Link>
            <div className="avatar placeholder">
              <div className="w-10 h-10 rounded-full bg-neutral-focus">
                <span>{image}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={isOpen ? "w-full h-screen " : "hidden"}>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 z-[1] p-2 shadow bg-base-100  w-full justify-end"
        >
          <li className="w-full flex flex-row justify-between items-center">
            <p className="text-xl font-bold ">Novedades</p>
            <Link href="#">
              <AiOutlineRight className="text-xl" />
            </Link>
          </li>
          <li className="w-full flex flex-row justify-between items-center">
            <p className="text-xl font-bold mb-4">Promociones</p>
            <Link href="#">
              <AiOutlineRight className="text-xl" />
            </Link>
          </li>
          <li className="w-full">
            <button className=" flex justify-center items-center absolute top-1">
              <AiOutlineSearch className="w-6 h-6" />
            </button>
            <input
              type="text"
              placeholder="Busca un artículo"
              className="input input-bordered w-full pl-12"
            />
          </li>
        </ul>
        <ul
          tabIndex={0}
          className="self-center menu menu-compact dropdown-content z-[1] p-2 shadow bg-base-100 mt-16 w-full  justify-end"
        >
          <li className="w-full flex flex-row justify-between items-center">
            <div>
              <FiLogIn className="text-xl" />
              {loged ? (
                <button className='text-xl' onClick={signOut}>Cerrar sesion</button>
              ): (

              <Link href={'/login'}  className="text-xl">Iniciar sesion</Link>
              )}
            </div>
            <Link href="/login">
              <AiOutlineRight className="text-xl" />
            </Link>
          </li>
          <li className="w-full flex flex-row justify-between items-center">
            <div>
              <AiOutlineQuestionCircle className="h-6 w-6 text-xl" />
              <p className="text-xl">Preguntas</p>
            </div>
            <Link href="/login">
              <AiOutlineRight className="text-xl" />
            </Link>
          </li>
        </ul>

        <footer className="fixed bottom-0 w-full">
          <div className="w-full flex flex-row justify-end">
            <div className="flex flex-row justify-between items-center gap-3">
              <BiUserCircle className="text-xl h-6 w-6" />
              <p className="text-xl pr-2"> {email}</p>
            </div>
          </div>
          <div className="flex justify-between p-3">
            <div className="flex flex-row justify-start items-center gap-3 text-lg">
                <BiCopyright /> 
                <p>{year} Devios</p>
            </div>
            <div className="flex flex-row justify-start items-center gap-3 text-lg">
              <TbWorld />
              <p>España</p>
            </div>
          </div>
        </footer>
      </div>
    </nav>
  );
}
