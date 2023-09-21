"use client";
import { useDeviosStore } from "@/app/store/deviosStore";
import { useRouter } from "next/navigation";
import React, { FormEvent, FormEventHandler, useEffect } from "react";
import { RiVisaLine, RiMastercardFill } from "react-icons/ri";
import Finish from "./Finish";

function PaymentForm() {
  const year = new Date().getFullYear();
  const years = ["año"];
  const months = ["mes"];
  for (let i = year; i <= 2050; i++) {
    const j = i.toString();
    years.push(j);
  }
  for (let i = 1; i <= 12; i++) {
    const j = i.toString();
    months.push(j);
  }

  const getSession = useDeviosStore((state) => state.checkAuthState);
  const { user, cardDataForm, selectedCard, paid } = useDeviosStore();
  const { setCardDataForm, setPaid,setProducts,setLastProduct} = useDeviosStore();

  const router = useRouter();
  const handlePayment = (e: FormEvent) => {
    e.preventDefault();
    console.log(cardDataForm);
    setPaid(true);
    
  };
  useEffect(() => {
    getSession();
    if (!user) {
      router.replace("/login");
    } else {
      router.replace("/payment");
    }
  }, []);
  return (
    <div>
      {paid ? (
        <Finish />
      ) : (
        <div className="flex flex-col  h-screen">
          <h1 className="text-2xl font-bold">METODO DE PAGO</h1>
          <form
            onSubmit={handlePayment}
            className="flex flex-col gap-4 justify-between h-1/2 my-auto border p-4"
          >
            <div className="flex gap-4">
              <div className="flex gap-2 justify-center items-center">
                <input
                  className={`${
                    selectedCard === "visa" ? "bg-blue text-black" : ""
                  }`}
                  type="radio"
                  name="card"
                  id="visa"
                  value="visa"
                  checked={selectedCard === "visa"}
                  onChange={(e) => {
                    setCardDataForm({
                      ...cardDataForm,
                      cardProvider: e.target.value,
                    });
                  }}
                />
                <RiVisaLine className="w-16 h-16" />
                <label htmlFor="visa"></label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  className="w-12"
                  type="radio"
                  name="card"
                  id="mastercard"
                  value="mastercard"
                  checked={selectedCard === "mastercard"}
                  onChange={(e) => {
                    setCardDataForm({
                      ...cardDataForm,
                      cardProvider: e.target.value,
                    });
                  }}
                />
                <RiMastercardFill className="w-16 h-16" />
                <label htmlFor="mastercard"></label>
              </div>
            </div>

            <div className="flex flex-col gap-4 border">
              <h2>DATOS DE LA TARJETA</h2>
              <div>
                <label htmlFor="infoBankCard"></label>
                <input
                  className="w-full p-2"
                  type="text"
                  placeholder="NOMBRE Y APELLIDOS"
                  onChange={(e) =>
                    setCardDataForm({
                      ...cardDataForm,
                      fullName: e.target.value.toUpperCase(),
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="numBankCard"></label>
                <input
                  className="p-2 w-full"
                  type="text"
                  placeholder="NUMERO DE LA TARJETA"
                  onChange={(e) =>
                    setCardDataForm({
                      ...cardDataForm,
                      cardNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <div className="border w-full flex justify-center gap-4 items center px-2">
                  <div className="w-1/3">
                    <select
                      className="w-full"
                      name="expirationMonth"
                      onChange={(e) =>
                        setCardDataForm({
                          ...cardDataForm,
                          expirationMonth: e.target.value,
                        })
                      }
                    >
                      {months.map((month) => (
                        <option key={`month ${month}`} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-1/3 border">
                    <select
                      className="w-full"
                      name="expirationYear"
                      onChange={(e) =>
                        setCardDataForm({
                          ...cardDataForm,
                          expirationYear: e.target.value,
                        })
                      }
                    >
                      {years.map((year) => (
                        <option
                          className="w-full"
                          key={`month ${year}`}
                          value={year}
                        >
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-1/3">
                    <input
                      className="w-full"
                      type="text"
                      placeholder="CVV"
                      onChange={(e) =>
                        setCardDataForm({
                          ...cardDataForm,
                          cvv: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="cvv"></label>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue text-white w-full p-2 rounded-md"
            >
              REALIZAR PAGO
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PaymentForm;
