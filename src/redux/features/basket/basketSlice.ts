import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasketItem } from "../../../utils/types";

interface BasketState {
  items: BasketItem[];
}

const initialState: BasketState = {
  items: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<BasketItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem && existingItem.quantity < action.payload.maxQuantity) {
        existingItem.quantity += 1;
      } else if (
        existingItem &&
        existingItem.quantity >= action.payload.maxQuantity
      ) {
        console.log("item exceed Max limit");
      } else if (!existingItem) {
        state.items.push(action.payload);
      }
    },
    updateAvailability: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.maxQuantity = action.payload.quantity;
      }
    },
    removeFromBasket: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearBasket: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToBasket,
  updateAvailability,
  removeFromBasket,
  clearBasket,
} = basketSlice.actions;
export default basketSlice.reducer;
