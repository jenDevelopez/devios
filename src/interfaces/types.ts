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
  colors:ColorSelector[]
  color: ColorSelector
  sizeSelected:string



  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setFullName: (value: string) => void;
  setOpen: (open: boolean) => void;
  setActiveComponent: (component: React.FC) => void;
  setUser: (user: User) => void;
  setColor: (value:ColorSelector) => void;
  setSizeSelected: (value:string) => void;


  createUserWithPassword: (email: string, password: string) => void;
  signInWithPassword: (email: string, password: string) => void;
  checkAuthState: () => void;
  authGoogle: () => void;
  authGithub: () => void;
  logout: () => void;
  addNewUser: (name: string, email: string) => Promise<void>;
  findProduct: (id: string) => void;
  fetchProducts: (limit: number) => Promise<void>;
  fetchMoreProducts: (limit: number) => Promise<void>;
  goToPreviousImage: () => void;
  goToNextImage: () => void;
  
}

export interface CarouselType {
  images: string[];
  currentImageIndex: number;
  goToPreviousImage: () => void;
  goToNextImage: () => void;
}