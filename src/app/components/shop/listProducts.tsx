
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function ListProducts() {


 
  const supabase = createClientComponentClient()
    const { data: usuarios} = await supabase.from('usuarios').select('name')
 
 
  return(
    <>
      <h1>Lista de usuarios</h1>
      <p>{usuarios?.map( (usuario,index) => (
        <p key={index}>{usuario.name}</p>
      ))}</p>
    </>
    
  )
}