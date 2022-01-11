import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./gameSlice";
import { modalReducer } from "./modalSlice";
import { gameSettingsReducer } from "./gameSettingsSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
    modal: modalReducer,
    settings: gameSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
