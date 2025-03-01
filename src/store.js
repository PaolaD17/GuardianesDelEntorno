import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Almacena en localStorage
import userReducer from "./userSlice";

const persistConfig = {
  key: "root", // Clave para el almacenamiento
  storage, // Usa localStorage para guardar el estado
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

export const persistor = persistStore(store);
export default store;
