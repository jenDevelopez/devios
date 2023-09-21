import Link from "next/link";
import Image from "next/image";
export default function ProductCard({
  id,
  name,
  model,
  price,
  images,
}: {
  id: string;
  name: string;
  model: string;
  price: number;
  images: string[];
}) {
  return (
    <Link key={id} href={`${model}`}>
      <div className="container-card max-w-sm   border-gray-200 bg-transparent  rounded-t-lg relative">
        <Image
          className="w-full rounded-t-lg"
          src={images[0]}
          alt={name}
          width={200}
          height={300}
        />
        <div>
          <p className="p-2 text-xs">{name}</p>
          <div className="flex flex-row justify-between items-center w-full px-2">
            <p>{price}€</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
