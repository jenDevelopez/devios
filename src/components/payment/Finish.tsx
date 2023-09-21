"use client";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import Link from "next/link";
import { useDeviosStore } from "@/app/store/deviosStore";

export default function Finish() {
  const startAgain = useDeviosStore((state) => state.startAgain);

  useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: {
        y: 0.6,
      },
    });
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-2/3 h-2/3  bg-white flex flex-col justify-center items-center">
        <h1 className="text-center text-2xl font-semibold text-black">
          Has finalizado la simulación de compra!
        </h1>
        <p className="text-center text-slate-900">
          Por favor vuelve cuando Devios shop esté operativo
        </p>
        <div className="w-full flex justify.center my-2">
          <Link
            onClick={startAgain}
            className=" mx-auto w-2/3 btn btn-success text-center text-white my-4"
            href="/"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
