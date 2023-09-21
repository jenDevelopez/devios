"use client";

import { auth } from "@/app/firebaseConfig";
import { useDeviosStore } from "@/app/store/deviosStore";
import { useEffect } from "react";
import ProfileButtons from "../buttons/ProfileButtons";
import { useRouter } from "next/navigation";

export default function DataProfile() {
  const Component = useDeviosStore((state) => state.activeComponent);
  const activeComponent = Component && <Component />;
  const router = useRouter();
  const logout = useDeviosStore((state) => state.logout);
  const getSession = useDeviosStore((state) => state.checkAuthState);
  const user = useDeviosStore((state) => state.user);
  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  useEffect(() => {
    getSession();
    if (!user) {
      router.replace("/login");
    }
  }, [user, getSession]);

  return (
    <div className=" h-screen bg-binari bg-cover bg-center p-2">
      <ProfileButtons />
      {activeComponent}
      <div className="flex justify-center w-full">
        <button
          className=" fixed bottom-0 pb-4 text-white mx-auto"
          onClick={handleLogout}
        >
          Cerrar sesion
        </button>
      </div>
    </div>
  );
}
