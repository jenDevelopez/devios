import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import {
  DeviosStoreTypes,
  Order,
  ProductToCartType,
  ProductType,
} from "@/interfaces/types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { persist, devtools } from "zustand/middleware";
import { auth } from "../firebaseConfig";

export const useDeviosStore = create<DeviosStoreTypes>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        userId: "",
        email: "",
        password: "",
        isLogedIn: auth.currentUser !== null,
        open: false,
        products: [],
        fullName: "",
        lastProduct: 0,
        hasMoreProducts: true,
        activeComponent: null,
        product: {
          id: "",
          name: "",
          model: "",
          description: "",
          price: 0,
          images: [],
        },
        currentImageIndex: 0,
        sizeSelected: "",

        sizes: ["S Unisex", "M Unisex", "L Unisex", "XL Unisex"],

        cart: [],

        productToCart: {
          id: "",
          name: "",
          size: "",
          quantity: 0,
          price: 0,
          image: "",
        },
        totalPrice: 0,
        orders: [],
        isLoading: true,

        cardDataForm: {
          cardProvider: "",
          cardNumber: "",
          fullName: "",
          expirationMonth: "",
          expirationYear: "",
          cvv: "",
        },
        selectedCard: "",
        paid: false,

        setEmail: (value) => set({ email: value }),
        setPassword: (value: string) => set({ password: value }),
        setOpen: () => {
          set((state) => ({ open: !state.open }));
        },

        setFullName: (value) => set({ fullName: value }),
        setActiveComponent: (component: React.FC) =>
          set({ activeComponent: component }),
        setUser: (user: any) => set({ user: user }),
        setSizeSelected: (value) => set({ sizeSelected: value }),
        setProductToCart: (value) => set({ productToCart: value }),
        setCart: (value) => {
          const cart = get().cart;
          const productsCart = structuredClone(cart);
          set({ cart: [...productsCart] });
        },
        setTotalPrice: (value) => set({ totalPrice: value }),
        setIsLoading: (value) => set({ isLoading: value }),
        setCardDataForm(value) {
          set({ cardDataForm: value });
        },
        setSelectedCard: (value) => set({ selectedCard: value }),
        setPaid: (value) => set({ paid: value }),
        setProducts: (value) => set({ products: value }),
        setLastProduct: (value) => set({ lastProduct: value }),

        createUserWithPassword: async (email: string, password: string) => {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
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
              const user = userCredential.user;
              set({ isLogedIn: true });
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
            });
        },

        authGoogle: () => {
          auth.languageCode = "es";
          const provider = new GoogleAuthProvider();
          signInWithPopup(auth, provider)
            .then((result) => {
              const user = result.user;

              set({ isLogedIn: true });
              set({ user: user });
              console.log(user);
            })
            .catch((error) => {
              const errorMessage = error.message;

              console.log(errorMessage);
            });
        },


        logout: () => {
          signOut(auth)
            .then(() => {
              set({ isLogedIn: false });
              console.log(auth)
            })
            .catch((error) => {
              console.log(error);
            });
        },

        checkAuthState: () => {
          onAuthStateChanged(auth, (userData) => {
            if (userData) {
              const uid = userData.uid;
              set({ isLogedIn: true });
              set({ user: userData });
            } 
          });
        },

        fetchProducts: async (limit: number) => {
          try {
            const res = await fetch("http://localhost:3000/data.json");
            if (!res.ok) {
              throw new Error("Network response was not ok");
            }
            const json = await res.json();
            const lastProduct = get().lastProduct;

            const newProducts = json.slice(lastProduct, lastProduct + limit);
            const products = get().products;
            set({ products: [...products, ...newProducts] });
            set({ lastProduct: lastProduct + limit });
          } catch (error) {
            console.error(error);
          }
        },

        fetchMoreProducts: async (limit: number) => {
          const res = await fetch("http://localhost:3000/data.json");
          const json = await res.json();
          const lastProduct = get().lastProduct;

          const newProducts = json.slice(lastProduct, lastProduct + limit);
          set({ products: [...get().products, ...newProducts] });
          set({ lastProduct: lastProduct + limit });
          console.log(lastProduct);
          if (lastProduct + limit >= json.length) {
            set({ hasMoreProducts: false });
            set({ lastProduct: json.length - 1 });
          }
        },

        findProduct: async (id) => {
          try {
            const res = await fetch("http://localhost:3000/data.json");
            const products = await res.json();
            const productFound = products.find(
              (product: ProductType) => product.model === id
            );
            set({ product: productFound });
            return productFound;
          } catch (error) {
            console.error(error);
            return null;
          }
        },

        goToPreviousImage: () => {
          const currentImageIndex = get().currentImageIndex;
          if (currentImageIndex === 0) {
            return null;
          } else {
            set({ currentImageIndex: get().currentImageIndex - 1 });
          }
        },

        goToNextImage: () => {
          const product = get().product;
          const currentImageIndex = get().currentImageIndex;
          if (currentImageIndex > product.images.length - 1) {
            return null;
          } else {
            set({ currentImageIndex: get().currentImageIndex + 1 });
          }
        },

        addProductToCart: (
          id: string,
          name: string,
          size: string,
          price: number,
          image: string
        ) => {
          const productToAdd: ProductToCartType = {
            id: id,
            name: name,
            size: size,
            quantity: 1,
            price: price,
            image: image,
          };

          // Agregar el producto al carrito (cart)

          const cart = get().cart;
          const productFinded = cart.find((product) => product.id === id);
          if (productFinded) {
            const updatedCart = cart.map((product) => {
              if (product.id === id) {
                return {
                  ...product,
                  quantity: product.quantity + 1,
                };
              }
              return product;
            });
            set({ cart: updatedCart });
          } else {
            cart.push(productToAdd);

            set({ cart: cart });
          }
        },

        addItemToCart: (id: string) => {
          const currentCart = get().cart;
          const productIndex = currentCart.findIndex(
            (product) => product.id === id
          );
          if (productIndex !== -1) {
            const updatedCart = [...currentCart];
            updatedCart[productIndex] = {
              ...updatedCart[productIndex],
              quantity: updatedCart[productIndex].quantity + 1,
            };

            set({ cart: updatedCart });
          }
        },

        sustractItemToCart: (id: string) => {
          const currentCart = get().cart;
          const productIndex = currentCart.findIndex(
            (product) => product.id === id
          );
          if (productIndex !== -1) {
            const updatedCart = [...currentCart];
            updatedCart[productIndex] = {
              ...updatedCart[productIndex],
              quantity: updatedCart[productIndex].quantity - 1,
            };

            set({ cart: updatedCart });
          }
        },

        calculateTotalCart: () => {
          const cart = get().cart;
          const prices: number[] = cart.map(
            (product) => product.price * product.quantity
          );
          const totalPrice = prices.reduce((a, b) => a + b, 0);

          set({ totalPrice: totalPrice });
        },

        deleteProductFromCart: (id: string) => {
          const cart = get().cart;
          const newCart = cart.filter((product) => product.id !== id);
          set({ cart: newCart });
        },

        cleanCart: () => {
          const newCart: ProductToCartType[] = [];
          set({ cart: newCart });
        },
        createNewOrder: () => {
          const date = new Date();
          const newOrder: Order = {
            id: uuidv4(),
            idClient: get().userId,
            date: date.toString(),
            order: get().cart,
            totalPrice: get().totalPrice,
          };
          set({ orders: [...get().orders, newOrder] });
        },
        startAgain: () => {
          set({ products: [] });
          set({ lastProduct: 0 });
          set({ paid: false });
          set({ sizeSelected: "" });
          set({ cart: [] });
        },
      }),
      {
        name: "deviosStore",
      }
    )
  )
);
