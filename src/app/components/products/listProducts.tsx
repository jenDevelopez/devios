import { Database } from "@/app/interfaces/database";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Products() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: products } = await supabase.from("productos").select();
  console.log(products);
  return (
    <>
      <div className="grid grid-cols-2">
        {products?.map((product) => (
          <div
            key={product.id}
            className="card card-compact  bg-base-100 shadow-xl"
          >
            <figure>
              {/* <Image
           src={product.imagen}
           alt={product.nombre}
           width={300}
           height={300}
         /> */}
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.nombre}</h2>
              <p>{product.descripcion}</p>
              {/* <p>{product.precio}</p> */}
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Comprar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
