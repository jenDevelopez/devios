

export interface ProviderProps {
    children: React.ReactNode
}

export interface ProductType {
    id:string
    name:string
    description:string
    price:number
    image:string[]
  }

export interface DeviosStoreTypes {
    user: null | object
    email: string
    password: string
    isLogedIn: boolean
    open:boolean
    products:ProductType[]
    fullName: string
    product: ProductType

    setEmail: (value: string) => void
    setPassword: (value: string) => void
    setOpen: () => void
    setFullName: (value:string) => void

    createUserWithPassword: (email: string, password: string) => void
    signInWithPassword: (email:string, password:string) => void
    checkAuthState: () => void
    authGoogle: () => void
    authGithub: () => void
    logout: () => void
    addNewUser: (name:string,email:string) => Promise<void>
    findProduct: (id:string) => void
    fetchProduct: (limit: number) => void
}