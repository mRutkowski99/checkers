import { createSlice } from "@reduxjs/toolkit";
import { IModalSlice } from "./types";

const initialModalSlice: IModalSlice = {
  isOpen: true,
  content: "new-game",
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
  },
});

export const modalReducer = modalSlice.reducer;
export default modalSlice.actions;
