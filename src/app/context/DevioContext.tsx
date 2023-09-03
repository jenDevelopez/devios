"use client";
import { createContext, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { DeviosContextProps } from "../interfaces/interfaces";
export const DeviosContext = createContext<DeviosContextProps>(
  {} as DeviosContextProps
);

export default function DeviosProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loged, setLoged] = useState(false);
  const [email, setEmail] = useState<string| undefined>("Usuario");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(email?.charAt(0).toUpperCase());
 
  const signWithEmail = async (email:string) =>  {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/callback",
      },
    })
    if(error) {
      alert(error.message)
    }else{
      alert("Confirma tu email")
    }
    console.log(data.session)
  }

 const signWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
    if (error) {
      console.log(error.message);
    }
  };

   async function signWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
    if (error) {
      console.log(error);
    }else{
      console.log(data)
    }
  }

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.log(error);
    } else {
      setEmail(data.user.email);
      setImage(email?.charAt(0).toUpperCase());
    }
  };

  const signUp = async (email:string,password:string) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error(error);
    } else {
      alert("Registrado! Confirma tu email");
      data.user?.user_metadata;
    }

  };


  const signWithPassword = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email:email,
      password:password,
    });

    if (error) {
      console.log('Error: ',error)
    } else {
      setLoged(true);
    }
  };

 

 
  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session === null) {
      setLoged(false);
    } else {
      setLoged(true);
    }
    return session;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    } else {
      router.refresh();
    }
  };

  const getProducts = async () => {
    const {data: productos} = await supabase.from("productos").select();
    return productos;
  };


  return (
    <DeviosContext.Provider
      value={{
        // estados
        loged,setLoged,
        email,setEmail,
        password,setPassword,
        image,setImage,
        //funciones
        signWithEmail,
        signWithGithub,
        signWithGoogle,
        signOut,
        signWithPassword,
        signUp,
        getUser,
        getProducts,
        getSession,
      }}
    >
      {children}
    </DeviosContext.Provider>
  );
}
