import { createSlice } from "@reduxjs/toolkit";
import { IGameSlice } from "./types";
import { clearActiveFields, findMoves } from "../utilities/utilities";

const initialGameState: IGameSlice = {
  board: [
    ["bp", "-", "bp", "-", "bp", "-", "bp", "-"],
    ["-", "bp", "-", "bp", "-", "bp", "-", "bp"],
    ["bp", "-", "bp", "-", "bp", "-", "bp", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "rp", "-", "rp", "-", "rp", "-", "rp"],
    ["rp", "-", "rp", "-", "rp", "-", "rp", "-"],
    ["-", "rp", "-", "rp", "-", "rp", "-", "rp"],
  ],
  selected: "",
};

const gameSlice = createSlice({
  name: "game",
  initialState: initialGameState,
  reducers: {
    clickPawn(state, action) {
      const { id, color } = action.payload;

      if (state.selected === id) state.selected = "";
      else state.selected = id;

      if (state.selected === null) {
        state.board = clearActiveFields(state.board);
        return;
      }

      state.board = clearActiveFields(state.board);

      const possibleMoves = findMoves(id, color, state.board);
      possibleMoves.forEach((move) => {
        const [row, col] = move.split("/");
        state.board[+row][+col] = "a";
      });
    },

    selectMove(state, action) {
      const { id } = action.payload;

      if (!state.selected) return;

      const [moveRow, moveCol] = id.split("/");
      const [pieceRow, pieceCol] = state.selected.split("/");

      state.board[+moveRow][+moveCol] = state.board[+pieceRow][+pieceCol];
      state.board[+pieceRow][+pieceCol] = "-";
      state.selected = "";
      clearActiveFields(state.board);
    },
  },
});

export const gameReducer = gameSlice.reducer;
export default gameSlice.actions;
