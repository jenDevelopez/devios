import {ProfileComponent,SettingsComponent,ShoppingComponent,HelpComponent} from '@/components/profile'

export interface ProviderProps {
  children: React.ReactNode;
}

export interface User {
  uid:string
  displayName:string | null
  phoneNumber:string | null
  email:string | null
}
  
export interface ProductType {
  id: string;
  name: string;
  model:string
  description: string;
  price: number;
  images: string[];
}



export interface Button {
  id: number;
  text: string;
  component: React.FC;
}

export interface ColorSelector {
  value:string
  label:string
  colorClass:string
}

export interface DeviosStoreTypes {
  user: null | object;
  userId:string
  email: string;
  password: string;
  isLogedIn: boolean;
  products: ProductType[];
  fullName: string;
  lastProduct: number
  hasMoreProducts: boolean
  open: boolean;
  activeComponent: null | React.FC
  product: ProductType ;  
  currentImageIndex: number
  sizeSelected:string
  sizes: string[];
  cart: ProductToCartType[];
  productToCart: ProductToCartType;
  totalPrice:number
  orders:Order[]
  isLoading:boolean
  cardDataForm: DataCardType
  selectedCard:string
  paid:boolean

  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setFullName: (value: string) => void;
  setOpen: (open: boolean) => void;
  setActiveComponent: (component: React.FC) => void;
  setUser: (user: User) => void;
  setSizeSelected: (value:string) => void;
  setProductToCart: (value:ProductToCartType) => void;
  setCart: (value:ProductToCartType[]) => void;
  setTotalPrice:(value:number) => void;
  setIsLoading:(value:boolean) => void;
  setCardDataForm:(value:DataCardType) => void;
  setSelectedCard:(value:string) => void;
  setPaid:(value:boolean) => void;
  setProducts: (value: ProductType[]) => void;
  setLastProduct: (value: number) => void;

  createUserWithPassword: (email: string, password: string) => void;
  signInWithPassword: (email: string, password: string) => void;
  checkAuthState: () => void;
  authGoogle: () => void;
  logout: () => void;
  
  findProduct: (id: string) => void;
  fetchProducts: (limit: number) => Promise<void>;
  fetchMoreProducts: (limit: number) => Promise<void>;
  goToPreviousImage: () => void;
  goToNextImage: () => void;
  addItemToCart: (id:string) => void;
  sustractItemToCart: (id: string) => void;
  calculateTotalCart:() => void
  deleteProductFromCart:(id:string) => void
  cleanCart:() => void
  addProductToCart: (id:string,name:string,size:string,price:number,image:string) => void
  createNewOrder: () => void
  startAgain:() => void
}

export interface CarouselType {
  images: string[];
  currentImageIndex: number;
  goToPreviousImage: () => void;
  goToNextImage: () => void;
}

export interface ProductToCartType {
  id: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
  image:string
}

export interface Order {
  id:string
  idClient:string
  order:ProductToCartType[]
  date: string
  totalPrice:number
}

export interface DataCardType {
  cardProvider:string
  cardNumber:string
  fullName:string
  expirationMonth:string
  expirationYear:string
  cvv:string
}