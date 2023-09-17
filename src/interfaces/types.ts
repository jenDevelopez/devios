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
  description: string;
  price: number;
  image: string[];
}



export interface Button {
  id: number;
  text: string;
  component: React.FC;
}

export interface DeviosStoreTypes {
  user: null | object;
  email: string;
  password: string;
  isLogedIn: boolean;
  products: ProductType[];
  fullName: string;
  product: ProductType;
  open: boolean;
  activeComponent: null | React.FC

  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setFullName: (value: string) => void;
  setOpen: (open: boolean) => void;
  setActiveComponent: (component: React.FC) => void;
  setUser: (user: User) => void;



  createUserWithPassword: (email: string, password: string) => void;
  signInWithPassword: (email: string, password: string) => void;
  checkAuthState: () => void;
  authGoogle: () => void;
  authGithub: () => void;
  logout: () => void;
  addNewUser: (name: string, email: string) => Promise<void>;
  findProduct: (id: string) => void;
  fetchProduct: (limit: number) => void;

}

