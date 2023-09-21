import { useDeviosStore } from "@/app/store/deviosStore";
import { Button } from "@/interfaces/types";

function ProfileNavbar() {
  return (
    <div className="w-full flex justify-around">
      <button className="border px-2 py-1 pointer">PERFIL</button>
      <button className="border px-2 py-1 pointer">COMPRAS</button>
      <button className="border px-2 py-1 pointer">AYUDA</button>
      <button className="border px-2 py-1 pointer">AJUSTES</button>
    </div>
  );
}



export default ProfileNavbar;
