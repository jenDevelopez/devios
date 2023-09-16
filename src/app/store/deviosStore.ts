import { create } from "zustand";
import { DeviosStoreTypes } from "@/interfaces/types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { products } from "@/data/data";
import { auth } from "../firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

export const useDeviosStore = create<DeviosStoreTypes>((set) => ({
  user: null,
  email: "",
  password: "",
  isLogedIn: auth.currentUser !== null,
  open: false,
  products: [],
  fullName: "",
  product: {
    id: "",
    name: "",
    description: "",
    price: 0,
    image: [],
  },

  setEmail: (value) => set({ email: value }),
  setPassword: (value: string) => set({ password: value }),
  setOpen: () => {
    set((state) => ({ open: !state.open }));
  },
  setFullName: (value) => set({ fullName: value }),

  createUserWithPassword: async (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  },

  signInWithPassword: (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        set({ isLogedIn: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  },
  authGithub: () => {
    auth.languageCode = 'es'
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const user = result.user
       
        set({ user: user });
        set({ isLogedIn: true });
        
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
        console.log(errorMessage);
      });
  },
  authGoogle: () => {
    auth.languageCode = "es";
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        set({ isLogedIn: true });
        set({ user: user });
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log(errorMessage);
      });
  },

  logout: () => {
    signOut(auth)
      .then(() => {
        // const router = useRouter()
        // Sign-out successful.
        set({ isLogedIn: false });
        // router.reload()
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  },

  checkAuthState: () => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = userData.uid;
        set({ isLogedIn: true });
        set({ user: userData });
      } else {
        // User is signed out
        // ...
      }
    });
  },

  addNewUser: async (name: string, email: string) => {},

  findProduct: (id: string) => {
    const productData = products.find((product) => product.id === id);
    set({ product: productData });
  },

  fetchProduct: async (limit: number) => {
    const res = await fetch("http://localhost:3000/data/data.json");
    const json = await res.json();
    const questions = json.slice(0, limit);
    set({ products });
  },
}));
