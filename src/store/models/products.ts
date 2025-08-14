import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { CartProduct } from "@/interfaces/product";

type ProductsState = {
  cartProducts: CartProduct[];
};

export const products = createModel<RootModel>()({
  state: { cartProducts: [] } as ProductsState,
  reducers: {
    addItem(state, payload: CartProduct) {
      const existing = state.cartProducts.find((i) => i.id === payload.id);
      if (existing) {
        return {
          ...state,
          cartProducts: state.cartProducts.map((i) =>
            i.id === payload.id
              ? { ...i, quantity: i.quantity + payload.quantity }
              : i
          ),
        };
      }
      return {
        ...state,
        cartProducts: [...state.cartProducts, payload],
      };
    },
    updateItem(state, payload: { id: number; quantity: number }) {
      return {
        ...state,
        cartProducts: state.cartProducts.map((i) =>
          i.id === payload.id ? { ...i, quantity: payload.quantity } : i
        ),
      };
    },
    removeItem(state, id: number) {
      return {
        ...state,
        cartProducts: state.cartProducts.filter((i) => i.id !== id),
      };
    },
    clearCart() {
      return { cartProducts: [] };
    },
  },
  effects: (dispatch) => ({
    async checkout(_, rootState) {
      const { cartProducts } = rootState.cart;
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartProducts }),
      });
      if (res.ok) {
        dispatch.products.clearCart();
      }
    },
  }),
});
