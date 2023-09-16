'use client'
import React, { EventHandler, useEffect,useRef } from 'react'
import { useState } from 'react'
import {
    collection,
    addDoc,
    getDoc,
    QuerySnapshot,
    query,
    onSnapshot,
    deleteDoc,
    doc,
  } from 'firebase/firestore';
import { database } from '@/app/firebaseConfig'
export default function FormAddProduct() {
    const [total,setTotal] = useState(0)

    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
    })

   
    const [products,setProducts] = useState<any[]>([])

    //Añadir producto a la base de datos

    const addProduct = async (e) => {
        e.preventDefault()
        if(newProduct.name !== '' && newProduct.price !== '') {
          
            await addDoc(collection(database, 'products'), {
                name: newProduct.name,
                description: newProduct.description,
                price: newProduct.price
            });
            setNewProduct({
                name:'',
                description:'',
                price:''
            })
        }
    }
    //Leer producto de la base de datos
    useEffect(() => {
        const q = query(collection(database,'products'))
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let productsArray:any = []

            QuerySnapshot.forEach((doc) => {
                productsArray.push({...doc.data(), id:doc.id})
            })
            setProducts(productsArray)
            //Leer productos de productsArray
            const calculateTotal = () => {
                const totalPrice = productsArray.reduce((sum:number, item:any) => sum + parseFloat(item.price),0)
                setTotal(totalPrice)
            };
            calculateTotal()
            console.log(products)
            return () => unsubscribe()
        })
    },[])
    //Eliminar producto de la base de datos
    const deleteProduct = async(id) => {
        await deleteDoc(doc(database,'products', id))
    }


  
    return (
        <>
            <h1 className='text-center my-2'>Añadir productos al catálogo</h1>
            <div>
                <form className='w-4/5 mx-auto'>
                    <div className="form-control my-2">
                   
                    <input 
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name:e.target.value})}
                        type="text"
                        placeholder='Nombre del producto' 
                    />
                    </div>
                    <div className="form-control my-2">
                        <textarea 
                        cols={10} rows={4} 
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description:e.target.value})}
                        placeholder='Escribe la descripcion del producto'>
                    </textarea>
                    </div>
                    
                    <div className="form-control my-2">
                        <input 
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price:e.target.value})}
                        type="number"
                        placeholder='Precio del producto' 
                       
                    /> 
                    </div>
                   
                   {/* <div className="form-control"> 
                     <input 
                        value={newProduct.images}
                        onChange={(e) => setNewProduct({...newProduct, images:[]})}
                        type="file" multiple={true} placeholder='Imagenes del producto'
                         />
                   </div> */}
                    
                    <button className='btn mt-3' type='submit' onClick={addProduct}>Añadir producto</button>
                </form>
                <ul>
                    {products.map((item, id) => (
                        <div key={id} className='flex justify-between'>
                            <li>
                            <div className='flex flex-col items-center justify-center'>
                                <span>{item.name}</span>
                                <span>{item.description}</span>
                                <span>{item.price}</span>
                            </div>
                        </li>
                        <button onClick={() => deleteProduct(item.id)}>Eliminar producto</button>
                        </div>
                        
                    ))}
                </ul>
            </div>
        </>
    )
}
