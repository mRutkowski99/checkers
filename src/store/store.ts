import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./gameSlice";
import { modalReducer } from "./modalSlice";

const store = configureStore({
  reducer: { game: gameReducer, modal: modalReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
