import { BiCopyright } from "react-icons/bi";
import { TbWorld } from "react-icons/tb";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="w-full h-16 bg-base-100 fixed bottom-0 flex items-center">
      <div className="flex justify-between px-2 pb-2 w-full">
        <div className="flex items-center">
          <BiCopyright />
          <span>{year} Devios</span>
        </div>
        <div className="flex items-center">
          <TbWorld />
          <span>España</span>
        </div>
      </div>
    </footer>
  );
}
