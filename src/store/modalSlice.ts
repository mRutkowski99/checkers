import { createSlice } from "@reduxjs/toolkit";
import { IModalSlice } from "./types";

const initialModalSlice: IModalSlice = {
  isOpen: true,
  content: "new-game",
  playerNames: {
    red: "Player 1",
    black: "Player 2",
  },
};

const modalSlice = createSlice({
  initialState: initialModalSlice,
  name: "modal",
  reducers: {
    close(state) {
      state.isOpen = false;
    },

    open(state, action) {
      state.isOpen = true;
      state.content = action.payload;
    },

    setNames(state, action) {
      const { redName, blackName } = action.payload;
      state.playerNames = {
        red: redName,
        black: blackName,
      };
    },
  },
});

export const modalReducer = modalSlice.reducer;
export default modalSlice.actions;
