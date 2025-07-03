import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import heroesReducer from "./slices/heroesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    heroes: heroesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
