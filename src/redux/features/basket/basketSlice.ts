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

      if (existingItem) {
        if (
          existingItem.currentQuantity !== undefined &&
          existingItem.currentQuantity < existingItem.maxQuantity
        ) {
          existingItem.currentQuantity =
            (existingItem.currentQuantity || 0) + 1;
          existingItem.availableQuantity =
            (existingItem.availableQuantity || 0) - 1;
        } else {
          console.log("Item exceeds max limit");
        }
      } else {
        state.items.push({
          ...action.payload,
          currentQuantity: 1,
          availableQuantity: action.payload.maxQuantity - 1,
        });
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

export const { addToBasket, removeFromBasket, clearBasket } =
  basketSlice.actions;
export default basketSlice.reducer;
