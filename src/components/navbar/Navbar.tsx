"use client";
import { useDeviosStore } from "@/app/store/deviosStore";
import Link from "next/link";
import { useEffect } from "react";
import { BiUserCircle, BiHeart, BiCart } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  AiOutlineClose,
  AiOutlineRight,
  AiOutlineSearch,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import Footer from "../footer/Footer";
import { nicoMoji } from "@/app/layout";
import { useRouter } from "next/navigation";
import { PiShoppingCartSimple } from "react-icons/pi";

export default function Navbar() {

  const { open, setOpen, isLogedIn, logout } = useDeviosStore();
  const getSession = useDeviosStore((state) => state.checkAuthState);
  const cart = useDeviosStore((state) => state.cart);
  const quantity = cart.length;
  const router = useRouter();
  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  const openMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    getSession();
    console.log(isLogedIn);
  }, [open, isLogedIn, getSession]);
  return (
    <>
      <nav
        className={`bg-[#B2D7FE] h-[10vh] text-white flex justify-between items-end pl-[20px] pr-[8px] `}
      >
        <button className="pointer p-2 " onClick={openMenu}>
          {!open && <GiHamburgerMenu className="text-2xl text-[#232946]" />}
        </button>
        {!open && (
          <Link href="/">
            <h1 className={`${nicoMoji.className} text-[#232946] text-[25px] `}>
              DEVIOS
            </h1>
          </Link>
        )}

        <div className="w-1/2  p-2">
          <div className="flex justify-end gap-3 text-[#232946]">
            {isLogedIn ? (
              <Link href="/profile">
                <BiUserCircle
                  className={`text-2xl ${
                    open ? "text-white" : "text-[#232946]"
                  } `}
                />
              </Link>
            ) : (
             
                <Link href={"/login"}>
                  <BiUserCircle
                    className={`text-2xl ${
                      open ? "text-white" : "text-[#232946]"
                    } `}
                  />
                </Link>
             
            )}
            <Link href="/cart">
              <PiShoppingCartSimple
                className={`text-2xl ${
                  open ? "text-white" : "text-[#232946] relative"
                } `}
              />

              {quantity > 0 && (
                <p className="absolute top-6 right-[7px] text-[#FF0000]  font-bold text-xs p-1 rounded-full">
                  {quantity}
                </p>
              )}
            </Link>
          </div>
        </div>
        {/* El menu se desliza */}

        <div
          className={`bg-binari bg-cover bg-center flex flex-col justify-start items-center fixed top-0 w-full h-full ${
            open ? "left-0" : "left-[-100%]"
          } ease-linear duration-300 z-[99] 
      `}
        >
          <div className="flex justify-between w-full h-[10vh] items-end pl-[20px] pr-[8px]">
            <button className="pointer p-2 " onClick={openMenu}>
              <AiOutlineClose className="text-3xl font-extrabold text-white " />
            </button>
            <div className="w-1/2  p-2">
              <div className="flex justify-end gap-3 text-[#232946]">
                {isLogedIn ? (
                  <Link href="/profile">
                    <BiUserCircle
                      className={`text-2xl ${
                        open ? "text-white" : "text-[#232946]"
                      } `}
                    />
                  </Link>
                ) : (
                  <Link href="/login">
                    <BiUserCircle
                      className={`text-2xl ${
                        open ? "text-white" : "text-[#232946]"
                      } `}
                    />
                  </Link>
                )}
                <Link href="/cart">
                  <BiCart
                    className={`text-2xl ${
                      open ? "text-white" : "text-[#232946]"
                    } `}
                  />
                </Link>
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 z-[1] p-2 w-full justify-end"
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
            className="self-center menu menu-compact dropdown-content z-[1] p-2 shadow  mt-16 w-full  justify-end"
          >
            <li className="w-full flex flex-row justify-between items-center">
              <div>
                <FiLogIn className="text-xl" />
                {isLogedIn ? (
                  <button className="text-xl" onClick={handleLogout}>
                    Cerrar sesion
                  </button>
                ) : (
                  <Link onClick={openMenu} href={"/login"} className="text-xl">
                    Iniciar sesion
                  </Link>
                )}
              </div>
              {!isLogedIn && (
                <Link href="/login" onClick={openMenu}>
                  <AiOutlineRight className="text-xl" />
                </Link>
              )}
            </li>
            <li className="w-full flex flex-row justify-between items-center">
              <div>
                <AiOutlineQuestionCircle className="h-6 w-6 text-xl" />
                <p className="text-xl">Preguntas</p>
              </div>
              <Link href="#">
                <AiOutlineRight className="text-xl" />
              </Link>
            </li>
          </ul>
          <div className="bg-binari"></div>
          <Footer />
        </div>
      </nav>
    </>
  );
}
