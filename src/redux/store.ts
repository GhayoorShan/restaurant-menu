import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basket/basketSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist config for the basket slice
const persistConfig = {
  key: "basket",
  storage,
};

// Wrap basketReducer with persistReducer
const persistedBasketReducer = persistReducer(persistConfig, basketReducer);

export const store = configureStore({
  reducer: {
    basket: persistedBasketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor instance
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
