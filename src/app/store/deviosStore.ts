import { create } from 'zustand'
import { DeviosStoreTypes, ProductType } from '@/interfaces/types';
import { createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, GithubAuthProvider, signOut, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

import { auth } from '../firebaseConfig'


export const useDeviosStore = create<DeviosStoreTypes>((set,get) => ({
    user: null,
    email: '',
    password: '',
    isLogedIn: auth.currentUser !== null,
    open: false,
    products: [],
    fullName: '',
    lastProduct:0,
    hasMoreProducts:true,
    activeComponent:null ,
    product:{
        id:'',
        name:'',
        model:'',
        description:'',
        price:0,
        images:[]
    },
    currentImageIndex:0,
    colors:[
        { value: '#000', label: 'negro', colorClass: 'bg-black' },
        { value: '#fff', label: 'blanco', colorClass: 'bg-white' },
        { value: '##808080', label: 'gris', colorClass: 'bg-grey-500' },
    ],
    color: {
        value:'black',
        label:'black',
        colorClass:'bg-black'
    },
    sizeSelected: '',
 

    setEmail: (value) => set({ email: value }),
    setPassword: (value: string) => set({ password: value }),
    setOpen: () => {
        set((state) => ({ open: !state.open }))
    },

    setFullName: (value) => set({fullName: value}),
    setActiveComponent: (component: React.FC) => set({ activeComponent: component }),
    setUser: (user: any) => set({ user: user }),
    setColor:(value) => set({color:value}),
    setSizeSelected: (value) => set({sizeSelected:value}),

    createUserWithPassword: async (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });


    },

    signInWithPassword: (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                set({isLogedIn:true})
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    },

    authGoogle: () => {
        auth.languageCode = 'es'
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                set({ isLogedIn: true })
                set({ user: user })
                console.log(user)
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);

                console.log(errorMessage)
            });
    },

    authGithub: () => {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                set({isLogedIn:true})
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                set({isLogedIn:true})
                set({user:user})
                console.log(user)
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GithubAuthProvider.credentialFromError(error);
                // ...
                console.log(credential)
            });
    },

    logout: () => {
        signOut(auth).then(() => {
            // const router = useRouter()
            // Sign-out successful.
            set({ isLogedIn: false })
            // router.reload()
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    },

    checkAuthState: () => {
        onAuthStateChanged(auth, (userData) => {
            if (userData) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = userData.uid;
                set({ isLogedIn: true })
                set({user:userData})
            } else {
                // User is signed out
                // ...
            }
        });

    },


    addNewUser: async (name: string, email: string) => {
        
    },

   

    fetchProducts: async (limit: number) => {
        try{

            const res = await fetch("http://localhost:3000/data.json");
            if(!res.ok){
                throw new Error('Network response was not ok');
            }
            const json = await res.json();
            const lastProduct = get().lastProduct;
    
            const newProducts = json.slice(lastProduct, lastProduct + limit)
            const products = get().products
            set({products: [...products, ...newProducts]})
            set({lastProduct: lastProduct + limit})
        }catch(error){
            console.error(error)
        }
       
    },  
        
        
    

    
    fetchMoreProducts: async(limit: number) => {
        const res = await fetch("http://localhost:3000/data.json");
        const json = await res.json();
        const lastProduct = get().lastProduct;

        const newProducts = json.slice(lastProduct, lastProduct + limit);
        set({ products : [...get().products, ...newProducts] });
        set({lastProduct: lastProduct + limit})
        console.log(lastProduct)
        if(lastProduct + limit >= json.length){
            set({hasMoreProducts: false})
            set({lastProduct: json.length - 1})
        }
    },

    findProduct: async (id) => {
        try {
          const res = await fetch('http://localhost:3000/data.json');
          const products = await res.json();
          const productFound = products.find((product:ProductType) => product.model === id);
          set({product:productFound})
          return productFound;
        } catch (error) {
          console.error(error);
          return null;
        }
    },

    goToPreviousImage:() => {
    const currentImageIndex = get().currentImageIndex;
    if(currentImageIndex === 0){
        return null
    }
    else{
        set({currentImageIndex: get().currentImageIndex - 1})

    }
    },

    goToNextImage:() => {
        const product = get().product;
        const currentImageIndex = get().currentImageIndex;
    if(currentImageIndex > product.images.length - 1){
        return null
    }else{
        set({currentImageIndex: get().currentImageIndex + 1})

    }
    
    },

   
  
}))