import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type CartStore = {
  cartId: string
  setCartId: (id: string) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartId: "",
      setCartId: (id) => set((state) => ({ cartId: id })),
    }),
    { name: "theoney-cart", storage: createJSONStorage(() => localStorage) },
  ),
)

type CartState = {
  openCart: boolean
  setOpenCart: (state: boolean) => void
}

export const useCartState = create<CartState>()((set) => ({
  openCart: false,
  setOpenCart: (cartState) => set(() => ({ openCart: cartState })),
}))
