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
      // The serializableCheck is a feature provided by Redux Toolkit’s middleware, specifically designed to ensure that all actions
      // and state in our Redux store are serializable. Serialization means that the data can be safely converted to a format
      // (like JSON) and stored or transferred without issues.

      // Storing State: When persisting state (e.g., to localStorage or other storage engines), we typically convert data to JSON,
      // which requires the data to be serializable.
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // redux-persist uses several non-serializable actions like FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, and REGISTER to manage
      // the persistence process. These actions often contain non-serializable values (like promises, functions, or other complex objects).
      // If you don’t tell serializableCheck to ignore these actions, you’ll get errors, because Redux’s serializability check will flag them as invalid.

      // Non-serializable Actions in redux-persist
      // FLUSH: Ensures the storage engine has saved all changes.
      // REHYDRATE: When the persisted state is reloaded into the store, this action is dispatched to update the store with the persisted data.
      // PAUSE: Pauses persistence of the state.
      // PERSIST: Starts the persistence process, typically when the app is initialized.
      // PURGE: Removes persisted state from the storage.
      // REGISTER: Registers the reducer with redux-persist.
    }),
});

// Create a persistor instance
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
